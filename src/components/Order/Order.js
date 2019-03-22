import React from 'react';

import classes from './Order.module.css';

const order = (props) => {
	return (
		<div className={classes.Order}>
			<p><strong>Ingredients</strong>:
			<span className={classes.ingredientSpan}>bacon: {props.ingredients.bacon}</span>
			<span className={classes.ingredientSpan}>cheese: {props.ingredients.cheese} </span>
			<span className={classes.ingredientSpan}>meat: {props.ingredients.meat} </span>
			<span className={classes.ingredientSpan}>salad: {props.ingredients.salad}</span>
			</p>
			<p>Price: <strong>USD${props.totalPrice}</strong></p>
		</div>
	);
}

export default order;

