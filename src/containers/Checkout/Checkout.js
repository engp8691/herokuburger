import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
	componentDidMount(){
		this.props.onPurchaseInit();
	}

	checkoutCancelled = ()=>{
		this.props.history.goBack();
	}

	checkoutContinued = ()=>{
		this.props.history.replace('/checkout/contact-data');
	}

	render(){
		const myCheckoutSummary = <CheckoutSummary ingredients={this.props.ingredients} checkoutCancelled={this.checkoutCancelled} checkoutContinued={this.checkoutContinued} />;

		const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null

		console.log(27, "Checkout", this.props);

		return (
			<div>
				{purchasedRedirect}
				<Route exact path={this.props.match.path} render={(props)=>myCheckoutSummary} />
				<Route path={this.props.match.path + '/contact-data'} component={ContactData} />
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps)=>({
	ingredients: state.burgerBuilderReducer.ingredients,
	purchased: state.orderReducer.purchased
});

const mapDispatchToProps = (dispatch, ownProps)=>({
	onPurchaseInit: ()=>dispatch(actions.purchaseInit())
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

