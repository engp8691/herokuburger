import React, {Component} from 'react';
import { connect } from 'react-redux';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';

class Auth extends Component {
	constructor(props){
		super(props);

		this.state = {
			controls: {
				email: {
					elementType: 'input',
					elementConfig: {
						type: 'email',
						placeholder: 'Your Email'
					},
					value: '',
					validation: {
						required: true,
						isEmail: true
					},
					valid: false,
					touched: false
				},
				password: {
					elementType: 'input',
					elementConfig: {
						type: 'password',
						placeholder: 'Your Name'
					},
					value: '',
					validation: {
						required: true,
						minLength: 6 
					},
					valid: false,
					touched: false
				}
			}
		}
	}

	changeHandler = (event, inputIdentifier)=>{
		const updatedOrderForm = {
			...this.state.controls
		};
		const updatedElement = {
			...updatedOrderForm[inputIdentifier]
		};

		updatedElement.value=event.target.value;
		updatedElement.touched = true;
		updatedElement.valid=this.checkValidity(updatedElement.value, updatedElement.validation);
		// console.log(140, updatedElement);
		updatedOrderForm[inputIdentifier] = updatedElement;

		let formIsValid = true;
		for(let key in updatedOrderForm){
			if(updatedOrderForm[key].validation){
				formIsValid = updatedOrderForm[key].valid && formIsValid;
			}
		}

		this.setState({controls: updatedOrderForm, formIsValid: formIsValid});
	}

	validateEmail(email) {
		if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(email)) {
			return true;
		}
		return false;
	}


	checkValidity(value, rules){
		let isValid = true;

		if(!rules){
			return isValid;
		}

		if(rules.required){
			isValid = value.trim() !== '' && isValid;
		}
		if(rules.minLength){
			isValid = value.length >= rules.minLength && isValid;
		}
		if(rules.maxLength){
			isValid = value.length <= rules.maxLength && isValid;
		}
		if(rules.isEmail){
			isValid = this.validateEmail(value) && isValid;
		}

		return isValid;
	}

	submitHandler = (e)=>{
		e.preventDefault();

		console.log(this.state.controls.email.value, this.state.controls.password.value);

		this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value);
	}

	render(){
		let formElementsArray = [];
		const keys = Object.keys(this.state.controls);
		formElementsArray = keys.map((elem)=>{
			return (
				<Input
					key={elem}
					label={elem}
					elementType={this.state.controls[elem].elementType}
					elementConfig={this.state.controls[elem].elementConfig}
					value={this.state.controls[elem].value}
					invalid={!this.state.controls[elem].valid}
					requireValidation={this.state.controls[elem].validation}
					touched={this.state.controls[elem].touched}
					changeHandler={(e)=>this.changeHandler(e, elem)}
				/>
			);
		});

		let btnType = 'Success';
		if(!this.state.formIsValid){
			btnType = 'Disabled';
		}

		return (
			<div className={classes.Auth}>
				<form onSubmit={this.submitHandler}>
					{formElementsArray}

					<Button btnType={btnType} isDisabled={!this.state.formIsValid}>Submit</Button>
				</form>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch, ownProps)=>{
	return {
		onAuth: (email, password)=>dispatch(actions.auth(email, password))
	}
}


export default connect(null, mapDispatchToProps)(Auth);

