import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import axiosinstance from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

import Input from '../../../components/UI/Input/Input';

import classes from './ContactData.module.css';

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
					valid: false
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
					valid: false
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
						minLength: 5
					},
					valid: false
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
					valid: false
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
					valid: false
				},
            	deliveryMethod: {
					elementType: 'select',
					elementConfig: {
						options: [
							{value: 'fastest', displayValue: 'Fatest'},
							{value: 'cheapest', displayValue: 'Slowest'}
						]
					}
				}
			},
			loading: false
		}
	}

	orderHandler = (event)=>{
		event.preventDefault();
		console.log("clicked", this.props.ingredients, this.props.totalPrice);
		this.setState({loading: true});

		const formData = {};
		for(let formElementIdentifier in this.state.orderForm){
			formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
		}

		const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
			orderData: formData
        };

        axiosinstance.post('/orders.json', order).then(
            response=>{
                this.setState({loading: false});
				this.props.history.push('/');
                console.log(response);
            }).catch(err=>{
                this.setState({loading: false});
                console.log(err);
            });
	}

	validateEmail(email) {
		if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(email)) {
			return true;
		}
		return false;
	}

	checkValidity(value, rules){
		let isValid = true;

		if(rules.required){
			isValid = value.trim() !== '' && isValid;
		}
		if(rules.minLength){
			isValid = value.length >= rules.minLength && isValid;
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
		updatedElement.valid=this.checkValidity(updatedElement.value, updatedElement.validation);
		// console.log(140, updatedElement);
		updatedOrderForm[inputIdentifier] = updatedElement;

		this.setState({orderForm: updatedOrderForm});
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
				changeHandler={(e)=>this.changeHandler(e, elem)}
				/>
			);
		});

		let form = (
			<form onSubmit={this.orderHandler}>
				{formElementsArray}

				<Button btnType='Success'>ORDER</Button>
			</form>
		);

		if(this.state.loading){
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

export default ContactData;
