import React from 'react';
import BuildControl from './BuildControl/BuildControl';

import classes from './BuildControls.module.css';

const controls = [
	{label: "Salad", type: 'salad'},
	{label: "Bacon", type: 'bacon'},
	{label: "Meat", type: 'meat'},
	{label: "Cheese", type: 'cheese'},
];

const buildControls = (props)=>{
	return (
		<div className={classes.BuildControls}>
		<p>Current Price: ${props.totalPrice}</p>
		{
			controls.map((ctrl)=>{
				return (<BuildControl key={ctrl.label} label={ctrl.label} type={ctrl.type} addHandler={props.addHandler} removeHandler={props.removeHandler} disableflag = {props.disabledInfo[ctrl.type]}/>);
			})
		}
		<button 
			disabled={!props.purchasable}
			className={classes.OrderButton}
			onClick={props.purchasing}
		>{props.isAuthenticated? "ORDER NOW" : "ATHENTICATE"}</button>
		</div>
	);
};

export default buildControls;
