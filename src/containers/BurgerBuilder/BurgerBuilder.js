import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axiosinstance from '../../axios-orders';

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
			ingredients: null,
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

		axiosinstance.get('/ingredients.json').then(
			response=>{
				this.setState({ingredients: response.data, error: false});
				console.log(response);
			}).catch(err=>{
				this.setState({ingredients: null, error: true});
				console.log(err);
			});
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
		this.setState({loading: true});

		const order = {
			ingredients: this.state.ingredients,
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
	}

	render(){
		let disabledInfo = { ...this.state.ingredients };
		for(let key in disabledInfo){
			disabledInfo[key] = disabledInfo[key]<1;
		}

		let orderSummary = null;
		let burger = <Spinner/>;
		if(this.state.error){
			burger = (<p>The ingredient cannot be loaded.</p>);
		} 

		if(this.state.ingredients){
			burger = (
				<>
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

			orderSummary = (<OrderSummary
				cancelHandler={this.purchaseCancelHandler}
				continueHandler={this.purchaseContinueHandler}
				ingredients={this.state.ingredients}
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

export default withErrorHandler(BurgerBuilder, axiosinstance);
