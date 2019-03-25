import React from 'react';
import classes from './Button.module.css';

const button = (props)=>(
	<button 
	disabled={props.isDisabled}
	className={[classes.Button, classes[props.btnType]].join(' ')}
	onClick={props.clickHandler}>{props.children}</button>
);

export default button;

