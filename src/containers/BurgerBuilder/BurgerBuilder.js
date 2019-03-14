import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
			ingredients: {
				salad: 0,
				bacon: 0,
				cheese: 0,
				meat: 0
			},
			totalPrice: 4.00,
			purchasable: false,
			purchasing: false
		}
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
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount+1;
		const updatedIngredients = {...this.state.ingredients};
		updatedIngredients[type]=updatedCount;

		const additionalPrice = INGREDIENT_PRICES[type];
		const updatedPrice = this.state.totalPrice + additionalPrice;
		const purchasable = this.isPurchasable(updatedIngredients);
		console.log(49, purchasable);
		this.setState({
			ingredients: updatedIngredients,
			totalPrice: updatedPrice,
			purchasable
		});
	}

	removeIngredientHandler = (type)=>{
		const oldCount = this.state.ingredients[type];
		if(oldCount<1) return;

		const updatedCount = oldCount-1;
		const updatedIngredients = {...this.state.ingredients};
		updatedIngredients[type]=updatedCount;

		const additionalPrice = INGREDIENT_PRICES[type];
		const updatedPrice = this.state.totalPrice - additionalPrice;
		const purchasable = this.isPurchasable(updatedIngredients);
		console.log(68, purchasable);
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
		alert("You want to purchse");
	}

	render(){
		let disabledInfo = { ...this.state.ingredients };
		for(let key in disabledInfo){
			disabledInfo[key] = disabledInfo[key]<1;
		}
		return (
			<>
				<Modal show={this.state.purchasing} backdropClicked={this.purchaseCancelHandler} >
				{
					this.state.purchasing? (<OrderSummary
					cancelHandler={this.purchaseCancelHandler}
					continueHandler={this.purchaseContinueHandler}
					ingredients={this.state.ingredients}
					totalPrice={this.state.totalPrice}
					/>) : null
				}
				</Modal>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls 
					purchasing={this.purchaseHandler}
					purchasable={this.state.purchasable} 
					totalPrice={this.state.totalPrice.toFixed(2)} 
					addHandler={this.addIngredientHandler} 
					removeHandler={this.removeIngredientHandler} 
					disabledInfo={disabledInfo} />
			</>
		);
	}
}

export default BurgerBuilder;
