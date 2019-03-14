import React from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = (props)=>{
	const ingredientSummary = Object.keys(props.ingredients).map((igKey, index)=>{
		return (<li key={igKey+index}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>);
	});

	return(
	<>
		<h3>Your Order</h3>
		<p>A burger with the following ingredients</p>
		<ul>
			{ingredientSummary}
		</ul>
		<p><strong>Total price:</strong> ${props.totalPrice.toFixed(2)}</p>
		<p>Continue to checkout?</p>
		<Button clickHandler={props.cancelHandler} btnType='Danger'>CANCEL</Button>
		<Button clickHandler={props.continueHandler} btnType='Success'>CONTINUE</Button>
	</>
	);
}

export default orderSummary;

