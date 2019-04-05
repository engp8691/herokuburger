import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
// import axiosinstance from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

import Input from '../../../components/UI/Input/Input';

import classes from './ContactData.module.css';

import * as actions from '../../../store/actions/index';

class ContactData extends Component {
	constructor(props){
		super(props);

		this.state = {
			orderForm: {
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
			},
			formIsValid: false
		}
	}

	orderHandler = (event)=>{
		event.preventDefault();

		const formData = {};
		for(let formElementIdentifier in this.state.orderForm){
			formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
		}

		const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
			orderData: formData,
			userId: this.props.userId
        };

		this.props.toOrderBurger(order, this.props.token);
	}

	validateEmail(email) {
		if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(email)) {
			return true;
		}
		return false;
	}

	checkValidity(value, rules){
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
			isValid = this.validateEmail(value) && isValid;
		}

		return isValid;
	}

	changeHandler = (event, inputIdentifier)=>{
		const updatedOrderForm = {
			...this.state.orderForm
		};
		const updatedElement = {
			...updatedOrderForm[inputIdentifier]
		};

		updatedElement.value=event.target.value;
		updatedElement.touched = true;
		updatedElement.valid=this.checkValidity(updatedElement.value, updatedElement.validation);
		// console.log(140, updatedElement);
		updatedOrderForm[inputIdentifier] = updatedElement;

		let formIsValid = true;
		for(let key in updatedOrderForm){
			if(updatedOrderForm[key].validation){
				formIsValid = updatedOrderForm[key].valid && formIsValid;
			}
		}

		this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
	}

	render(){
		let formElementsArray = [];
		const keys = Object.keys(this.state.orderForm);
		formElementsArray = keys.map((elem)=>{
			return (
			<Input
				key={elem}
				label={elem}
				elementType={this.state.orderForm[elem].elementType}
				elementConfig={this.state.orderForm[elem].elementConfig}
				value={this.state.orderForm[elem].value}
				invalid={!this.state.orderForm[elem].valid}
				requireValidation={this.state.orderForm[elem].validation}
				touched={this.state.orderForm[elem].touched}
				changeHandler={(e)=>this.changeHandler(e, elem)}
				/>
			);
		});

		let btnType = 'Success';
		if(!this.state.formIsValid){
			btnType = 'Disabled';
		}

		let form = (
			<form onSubmit={this.orderHandler}>
				{formElementsArray}

				<Button btnType={btnType} isDisabled={!this.state.formIsValid}>ORDER</Button>
			</form>
		);

		if(this.props.loading){
			form = <Spinner />;
		}

		return (
			<div className={classes.ContactData}>
				<h4>Enter your Contact Data</h4>
				{form}
			</div>
		);
	}
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

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
