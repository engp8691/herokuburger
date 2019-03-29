import React, { Component } from 'react';
import { connect } from 'react-redux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axiosinstance from '../../axios-orders';

import * as actions from '../../store/reducer/actions';

const INGREDIENT_PRICES={
	salad: 0.5,
	bacon: 0.6,
	cheese: 0.3,
	meat: 0.8
}

class BurgerBuilder extends Component{
	constructor(props){
		super(props);

		this.state = {
			totalPrice: 4.00,
			purchasable: false,
			purchasing: false,
			loading: false,
			error: false
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot){
		// This function is call EVERY time when the component is rendered
	}

	componentDidMount() { 
		// componentDidMount is call ONLY once, that is when the component is initially rendered
/*
		axiosinstance.get('/ingredients.json').then(
			response=>{
				this.setState({ingredients: response.data, error: false});
				console.log(response);
			}).catch(err=>{
				this.setState({ingredients: null, error: true});
				console.log(err);
			});
*/
	}

	isPurchasable = (updatedIngredients) => {
		let purchasable = false;
		let allIngredients = { ...updatedIngredients };
		for(let key in allIngredients){
			if(allIngredients[key]>0){
				purchasable = true;
			}
		}

		return purchasable;
	}

	addIngredientHandler = (type)=>{
		const oldCount = this.props.ingredients[type];
		const updatedCount = oldCount+1;
		const updatedIngredients = {...this.props.ingredients};
		updatedIngredients[type]=updatedCount;

		const additionalPrice = INGREDIENT_PRICES[type];
		const updatedPrice = this.state.totalPrice + additionalPrice;
		const purchasable = this.isPurchasable(updatedIngredients);

		this.setState({
			ingredients: updatedIngredients,
			totalPrice: updatedPrice,
			purchasable
		});
	}

	removeIngredientHandler = (type)=>{
		const oldCount = this.props.ingredients[type];
		if(oldCount<1) return;

		const updatedCount = oldCount-1;
		const updatedIngredients = {...this.props.ingredients};
		updatedIngredients[type]=updatedCount;

		const additionalPrice = INGREDIENT_PRICES[type];
		const updatedPrice = this.state.totalPrice - additionalPrice;
		const purchasable = this.isPurchasable(updatedIngredients);

		this.setState({
			ingredients: updatedIngredients,
			totalPrice: updatedPrice,
			purchasable,

		});
	}

	purchaseHandler = ()=>{
		this.setState({purchasing: true});
	}

	purchaseCancelHandler = ()=>{
		this.setState({purchasing: false});
	}

	purchaseContinueHandler = ()=>{
	/*
		this.setState({loading: true});

		const order = {
			ingredients: this.props.ingredients,
			price: this.state.totalPrice,
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
				this.setState({loading: false, purchasing: false});
				console.log(response);
			}).catch(err=>{
				this.setState({loading: false, purchasing: true});
				console.log(err);
			});
	*/
		let queryParams = [];
		for(let i in this.props.ingredients){
			queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingredients[i]));
		}
		queryParams.push("price="+this.state.totalPrice);
		const queryString = queryParams.join('&');
		console.log(139, queryString);

		this.props.history.push({
			pathname: '/checkout',
			search: '?' + queryString});
	}

	render(){
		let disabledInfo = { ...this.props.ingredients };
		for(let key in disabledInfo){
			disabledInfo[key] = disabledInfo[key]<1;
		}

		let orderSummary = null;
		let burger = <Spinner/>;
		if(this.state.error){
			burger = (<p>The ingredient cannot be loaded.</p>);
		} 

		if(this.props.ingredients){
			burger = (
				<>
				<Burger ingredients={this.props.ingredients} />
				<BuildControls 
					purchasing={this.purchaseHandler}
					purchasable={this.state.purchasable} 
					totalPrice={this.state.totalPrice.toFixed(2)} 
					addHandler={this.props.addIngredient}
					removeHandler={this.props.removeIngredient} 
					disabledInfo={disabledInfo} />
				</>
			);

			orderSummary = (<OrderSummary
				cancelHandler={this.purchaseCancelHandler}
				continueHandler={this.purchaseContinueHandler}
				ingredients={this.props.ingredients}
				totalPrice={this.state.totalPrice}
			/>);
		}

		if(this.state.loading){
			orderSummary = (<Spinner/>);
		}

		return (
			<>
				<Modal show={this.state.purchasing} backdropClicked={this.purchaseCancelHandler} >
				{
					this.state.purchasing? orderSummary : null
				}
				</Modal>
				{ burger }
			</>
		);
	}
}

const mapStateToProps = (state, ownProps)=>{
	return {
		ingredients: state.ingredients
	}
};

const mapDispatchToProps = (dispatch, ownProps)=>{
	return{
		addIngredient: (ingName)=>dispatch({type: actions.ADD_INGREDIENT, ingredientName: ingName}),
		removeIngredient: (ingName)=>dispatch({type: actions.REMOVE_INGREDIENT, ingredientName: ingName})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axiosinstance));
