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
					value: ''
				},
				street: {
					elementType: 'input',
					elementConfig: {
						type: 'text',
						placeholder: 'Street Name'
					},
					value: ''
				},
				zipCode: {
					elementType: 'input',
					elementConfig: {
						type: 'text',
						placeholder: 'Zip Code'
					},
					value: ''
				},
				state: {
					elementType: 'input',
					elementConfig: {
						type: 'text',
						placeholder: 'State Name'
					},
					value: ''
				},
				email: {
					elementType: 'input',
					elementConfig: {
						type: 'text',
						placeholder: 'Your Email'
					},
					value: ''
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

	changeHandler = (event, inputIdentifier)=>{
		console.log(104, event.target.value, inputIdentifier);

		const updatedOrderForm = {
			...this.state.orderForm
		};
		const updatedElement = {
			...updatedOrderForm[inputIdentifier]
		};

		updatedElement.value=event.target.value;
		updatedOrderForm[inputIdentifier] = updatedElement;

		this.setState({orderForm: updatedOrderForm});
	}

	render(){
		let formElementsArray = [];
		const keys = Object.keys(this.state.orderForm);
		formElementsArray = keys.map((elem)=>{
			console.log(122, this.state.orderForm[elem].value);

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
