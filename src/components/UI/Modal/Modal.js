import React, {Component} from 'react';
import Backdrop from '../Backdrop/Backdrop.js';
import classes from './Modal.module.css'

class Modal extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
	}

	render(){
		return (
			<>
			<Backdrop show={this.props.show} backdropClicked={this.props.backdropClicked}> </Backdrop>
			{
				this.props.show? (
				<div className={classes.Modal}
					style={{
						transform: this.props.show? 'translateY(0)': 'translateY(-10)',
						opacity: this.props.show ? '1': '0'
					}}>
					{this.props.children}
				</div>): null
			}
			</>
		);
	}
}

export default Modal;

