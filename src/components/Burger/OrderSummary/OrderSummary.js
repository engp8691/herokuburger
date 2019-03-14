import React from 'react';

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
		<p>Continue to checkout?</p>
	</>
	);
}

export default orderSummary;
