import React from 'react';
import Backdrop from '../Backdrop/Backdrop.js';
import classes from './Modal.module.css'

const modal = (props) => {
	return (
		<>
		<Backdrop show={props.show} backdropClicked={props.backdropClicked}>
		</Backdrop>
		{
			props.show? (
			<div className={classes.Modal}
				style={{
					transform: props.show? 'translateY(0)': 'translateY(-10)',
					opacity: props.show ? '1': '0'
				}}>
				{props.children}
			</div>): null
		}
		</>
	);
};

export default modal;

