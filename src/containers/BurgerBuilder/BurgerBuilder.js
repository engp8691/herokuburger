import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axiosinstance from '../../axios-orders';

import * as actions from '../../store/actions/index';

const burgerBuilder = (props) => {
	const [purchasing, setPurchasing] = useState(false);

	useEffect(() => {
		props.toInitIngredients();
	}, []);

	const isPurchasable = (updatedIngredients) => {
		let purchasable = false;
		let allIngredients = { ...updatedIngredients };
		for(let key in allIngredients){
			if(allIngredients[key]>0){
				purchasable = true;
			}
		}

		return purchasable;
	}

	const purchaseHandler = ()=>{
		if(props.isAuthenticated){
			setPurchasing(true);
		}else{
			props.toSetAuthRedirectPath('/checkout');
			props.history.push('/auth');
		}
	}

	const purchaseCancelHandler = ()=>{
		setPurchasing(false);
	}

	const purchaseContinueHandler = ()=>{
		props.history.push({pathname: '/checkout'});
	}

	let disabledInfo = { ...props.ingredients };
	for(let key in disabledInfo){
		disabledInfo[key] = disabledInfo[key]<1;
	}

	let orderSummary = null;
	let burger = <Spinner/>;
	if(props.error){
		burger = (<p>The ingredient cannot be loaded.</p>);
	} 

	if(props.ingredients){
		burger = (
			<>
			<Burger ingredients={props.ingredients} />
			<BuildControls 
				purchasing={purchaseHandler}
				purchasable={isPurchasable(props.ingredients)}
				totalPrice={props.totalPrice.toFixed(2)} 
				addHandler={props.addIngredient}
				removeHandler={props.removeIngredient} 
				disabledInfo={disabledInfo}
				isAuthenticated = {props.isAuthenticated} />
			</>
		);

		orderSummary = (<OrderSummary
			cancelHandler={purchaseCancelHandler}
			continueHandler={purchaseContinueHandler}
			ingredients={props.ingredients}
			totalPrice={props.totalPrice}
		/>);
	}

	return (
		<>
			<Modal show={purchasing} backdropClicked={purchaseCancelHandler} >
			{
				purchasing? orderSummary : null
			}
			</Modal>
			{ burger }
		</>
	);
}

const mapStateToProps = (state, ownProps)=>{
	return {
		ingredients: state.burgerBuilderReducer.ingredients,
		totalPrice: state.burgerBuilderReducer.totalPrice,
		error: state.burgerBuilderReducer.error,
		isAuthenticated: state.authReducer.token !== null
	}
};

const mapDispatchToProps = (dispatch, ownProps)=>{
	return{
		addIngredient: (ingName)=>dispatch(actions.addIngredient(ingName)),
		removeIngredient: (ingName)=>dispatch(actions.removeIngredient(ingName)),
		toInitIngredients: ()=>dispatch(actions.initIngredient()),
		toSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, axiosinstance));

