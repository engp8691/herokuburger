import React from 'react';

import Burger from '../../Burger/Burger.js';
import Button from '../../UI/Button/Button.js';
import classes from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
	return (
		<div className={classes.CheckoutSummary}>
			<h1>We hope it tastes well</h1>
			<div stlye={{width: '100%'}}>
				<Burger ingredients = {props.ingredients}/>
			</div>

			<Button
				btnType="Danger"
				clickHandler={props.checkoutCancelled} >CANCEL</Button>

			<Button
				btnType="Success"
				clickHandler={props.checkoutContinued} >CONTINUE</Button>

		</div>
	)
}

export default checkoutSummary;

