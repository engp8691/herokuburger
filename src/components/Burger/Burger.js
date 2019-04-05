import React from 'react';
import { withRouter } from 'react-router-dom';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props)=>{
	let otherIngredients = [];

/*
	for(let key in props.ingredients){
		for(let i=0; i<props.ingredients[key]; i++){
			otherIngredients.push((<BurgerIngredient key={`${key}${i}`} type={`${key}`} />));
		}
	}
*/

	// Map the object to array
	otherIngredients = Object.keys(props.ingredients).map((igKey)=>{
		return [...Array(props.ingredients[igKey])].map((_, i)=>{
			return (<BurgerIngredient key={igKey + i} type={igKey} />);
		})
	}).reduce((arr, elem)=>{
		return arr.concat(elem);
	});

	if(otherIngredients.length === 0){
		otherIngredients = (<p className={classes.info}>请选择您的食材</p>);
	}

	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top" />
			{otherIngredients}
			<BurgerIngredient type="bread-bottom" />
		</div>
	);
};

export default withRouter(burger);


