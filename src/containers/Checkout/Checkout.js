import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
	constructor(props){
		super(props);

		this.state = {
			ingredients: {
				salad: 0,
				meat: 0,
				cheese: 0,
				bacon: 0
			},
			totalPrice: 0
		}
	}

	componentDidMount(){
		const query = new URLSearchParams(this.props.location.search);
		const ingredients = {};

		let totalPrice = 0;

		for (let param of query.entries()){
			if(param[0] === 'price'){
				totalPrice = param[1];
			}else{
				ingredients[param[0]] = +param[1];
			}
		}

		this.setState({ingredients, totalPrice});
	}

	checkoutCancelled = ()=>{
		this.props.history.goBack();
	}

	checkoutContinued = ()=>{
		this.props.history.replace('/checkout/contact-data');
	}

	render(){
		const myCheckoutSummary = <CheckoutSummary ingredients={this.state.ingredients} checkoutCancelled={this.checkoutCancelled} checkoutContinued={this.checkoutContinued} />;
		const myContactData = <ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...this.props} />;

		return (
			<div>
				<Route exact path={this.props.match.path} render={(props)=>myCheckoutSummary} />
				<Route path={this.props.match.path + '/contact-data'} render={(props)=>myContactData} />
			</div>
		);
	}
}

export default Checkout;


