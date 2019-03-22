import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import axiosinstance from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

import classes from './ContactData.module.css';

class ContactData extends Component {
	constructor(props){
		super(props);

		this.state = {
			name: '',
			email: '',
			address: {
				street: '',
				postalCode: ''
			},
			loading: false
		}
	}

	orderHandler = (event)=>{
		event.preventDefault();
		console.log("clicked", this.props.ingredients, this.props.totalPrice);

		this.setState({loading: true});

		const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Yonglin',
                address: {
                    street: 'Cypress street',
                    zipCode: '02445',
                    state: 'MA'
                },
                email: 'yonglin@tom.com'
            },
            deliveryMethod: 'fastest'
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

	render(){
		let form = (
			<form>
				<input type="text" name="name" placeholder="Your name" />
				<input type="email" name="email" placeholder="Your email" />
				<input type="text" name="street" placeholder="Your street" />
				<input type="text" name="postal" placeholder="Your postal code" />

				<Button clickHandler={this.orderHandler} btnType='Success'>ORDER</Button>
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
