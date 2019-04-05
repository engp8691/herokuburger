import React, { Component } from 'react';
import { connect } from 'react-redux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axiosinstance from '../../axios-orders';

import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component{
	constructor(props){
		super(props);

		this.state = {
			purchasing: false
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot){
		// This function is call EVERY time when the component is rendered
	}

	componentDidMount() { 
		// componentDidMount is call ONLY once, that is when the component is initially rendered

		this.props.toInitIngredients();
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

	purchaseHandler = ()=>{
		if(this.props.isAuthenticated){
			this.setState({purchasing: true});
		}else{
			this.props.toSetAuthRedirectPath('/checkout');
			this.props.history.push('/auth');
		}
	}

	purchaseCancelHandler = ()=>{
		this.setState({purchasing: false});
	}

	purchaseContinueHandler = ()=>{
		this.props.history.push({pathname: '/checkout'});
	}

	render(){
		let disabledInfo = { ...this.props.ingredients };
		for(let key in disabledInfo){
			disabledInfo[key] = disabledInfo[key]<1;
		}

		let orderSummary = null;
		let burger = <Spinner/>;
		if(this.props.error){
			burger = (<p>The ingredient cannot be loaded.</p>);
		} 

		if(this.props.ingredients){
			burger = (
				<>
				<Burger ingredients={this.props.ingredients} />
				<BuildControls 
					purchasing={this.purchaseHandler}
					purchasable={this.isPurchasable(this.props.ingredients)}
					totalPrice={this.props.totalPrice.toFixed(2)} 
					addHandler={this.props.addIngredient}
					removeHandler={this.props.removeIngredient} 
					disabledInfo={disabledInfo}
					isAuthenticated = {this.props.isAuthenticated} />
				</>
			);

			orderSummary = (<OrderSummary
				cancelHandler={this.purchaseCancelHandler}
				continueHandler={this.purchaseContinueHandler}
				ingredients={this.props.ingredients}
				totalPrice={this.props.totalPrice}
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

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axiosinstance));

