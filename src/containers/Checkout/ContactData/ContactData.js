import React, { useState } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
// import axiosinstance from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

import Input from '../../../components/UI/Input/Input';

import classes from './ContactData.module.css';

import * as actions from '../../../store/actions/index';

const contactData = (props) => {
	const [orderForm, setOrderForm] = useState({
		name: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Your Name'
			},
			value: '',
			validation: {
				required: true
			},
			valid: false,
			touched: false
		},
		street: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Street Name'
			},
			value: '',
			validation: {
				required: true
			},
			valid: false,
			touched: false
		},
		zipCode: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Zip Code'
			},
			value: '',
			validation: {
				required: true,
				minLength: 5,
				maxLength: 5
			},
			valid: false,
			touched: false
		},
		state: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'State Name'
			},
			value: '',
			validation: {
				required: true
			},
			valid: false,
			touched: false
		},
		email: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Your Email'
			},
			value: '',
			validation: {
				required: true,
				minLength: 10,
				isEmail: true
			},
			valid: false,
			touched: false
		},
		deliveryMethod: {
			elementType: 'select',
			elementConfig: {
				options: [
					{value: 'fastest', displayValue: 'Fatest'},
					{value: 'cheapest', displayValue: 'Slowest'}
				]
			},
			value: 'fastest',
			validation: {},
			valid: true
		}
	});

	const [formIsValid, setFormIsValid] = useState(false);

	const orderHandler = (event)=>{
		event.preventDefault();

		const formData = {};
		for(let formElementIdentifier in orderForm){
			formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
		}

		const order = {
            ingredients: props.ingredients,
            price: props.totalPrice,
			orderData: formData,
			userId: props.userId
        };

		props.toOrderBurger(order, props.token);
	}

	const validateEmail = (email)=>{
		if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(email)) {
			return true;
		}
		return false;
	}

	const checkValidity = (value, rules) => {
		let isValid = true;

		if(!rules){
			return isValid;
		}

		if(rules.required){
			isValid = value.trim() !== '' && isValid;
		}
		if(rules.minLength){
			isValid = value.length >= rules.minLength && isValid;
		}
		if(rules.maxLength){
			isValid = value.length <= rules.maxLength && isValid;
		}
		if(rules.isEmail){
			isValid = validateEmail(value) && isValid;
		}

		return isValid;
	}

	const changeHandler = (event, inputIdentifier) => {
		const updatedOrderForm = {
			...orderForm
		};
		const updatedElement = {
			...updatedOrderForm[inputIdentifier]
		};

		updatedElement.value=event.target.value;
		updatedElement.touched = true;
		updatedElement.valid=checkValidity(updatedElement.value, updatedElement.validation);
		// console.log(140, updatedElement);
		updatedOrderForm[inputIdentifier] = updatedElement;

		let formIsValid = true;
		for(let key in updatedOrderForm){
			if(updatedOrderForm[key].validation){
				formIsValid = updatedOrderForm[key].valid && formIsValid;
			}
		}

		setOrderForm(updatedOrderForm);
		setFormIsValid(formIsValid);
	}

	let formElementsArray = [];
	const keys = Object.keys(orderForm);
	formElementsArray = keys.map((elem)=>{
		return (
			<Input
				key={elem}
				label={elem}
				elementType={orderForm[elem].elementType}
				elementConfig={orderForm[elem].elementConfig}
				value={orderForm[elem].value}
				invalid={!orderForm[elem].valid}
				requireValidation={orderForm[elem].validation}
				touched={orderForm[elem].touched}
				changeHandler={(e)=>changeHandler(e, elem)}
			/>
		);
	});

	let btnType = 'Success';
	if(!formIsValid){
		btnType = 'Disabled';
	}

	let form = (
		<form onSubmit={orderHandler}>
			{formElementsArray}

			<Button btnType={btnType} isDisabled={!formIsValid}>ORDER</Button>
		</form>
	);

	if(props.loading){
		form = <Spinner />;
	}

	return (
		<div className={classes.ContactData}>
			<h4>Enter your Contact Data</h4>
			{form}
		</div>
	);
}

const mapStateToProps = (state, ownProps)=>({
	ingredients: state.burgerBuilderReducer.ingredients,
	totalPrice: state.burgerBuilderReducer.totalPrice,
	loading: state.orderReducer.loading,
	token: state.authReducer.token,
	userId: state.authReducer.userId
});

const mapDispatchToProps = (dispatch, ownProps)=>{
	return {
		toOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(contactData);

