import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
	let inputElement = null;

	switch( props.elementType){
		case ('input'):
			inputElement = (<input
					className={classes.InputElement}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changeHandler}
					/>);
			break;
		case ('textarea'):
			inputElement = (<textarea
					className={classes.InputElement}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changeHandler}
					/>);
			break;
		case ('select'):
			inputElement = (
				<select className={classes.InputElement} value={props.value} onChange={props.changeHandler} >
				{
					props.elementConfig.options.map(opt => <option key={opt.value} value={opt.value}>{opt.displayValue}</option>)
				}
				</select>);
			break;






		default:
			inputElement = (<input
					className={classes.InputElement}
					{...props.elementConfig}
					value={props.value}
					/>);
			break;
	}

	return (
		<div className={classes.Input}>
			<label htmlFor={props.name} className={classes.Label}>{props.label}</label>
			{inputElement}
		</div>
	);
}

export default input;