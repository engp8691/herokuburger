import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';

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
			},
			isSignup: true
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

	componentDidMount(){
		if(!this.props.buildingBurger && this.props.authRedirectPath !== "/" ){
			this.props.toSetAuthRedirectPath();
		}
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

		this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
	}

	switchAuthModeHandler = ()=>{
		this.setState(prevState => {
			return {isSignup: !prevState.isSignup};
		});
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

		let errMsg = null;
		if(this.props.error){
			errMsg = (<p style={{color: "red"}}>Authentication Failed: {this.props.error}</p>);
		}

		let authRedirect = null;
		if(this.props.isAuthenticated){
			authRedirect = <Redirect to={this.props.authRedirectPath} />
		}

		return (
			<div className={classes.Auth}>
				{authRedirect}

				{this.props.loading? <Spinner />: (
				<>
				<form onSubmit={this.submitHandler}>
					{formElementsArray}
					{errMsg}

					<Button btnType={btnType} isDisabled={!this.state.formIsValid}>Submit</Button>
				</form>
				<Button
					clickHandler = {this.switchAuthModeHandler}
					
					btnType="Danger">
					Sign {this.state.isSignup? "Up" : "In"}
				</Button>
				</>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps)=>{
	return {
		loading: state.authReducer.loading,
		token: state.authReducer.token,
		userId: state.authReducer.userId,
		error: state.authReducer.error,
		isAuthenticated: state.authReducer.token !== null,
		authRedirectPath: state.authReducer.authRedirectPath,
		buildingBurger: state.burgerBuilderReducer.building
	}
}

const mapDispatchToProps = (dispatch, ownProps)=>{
	return {
		onAuth: (email, password, isSignup)=>dispatch(actions.auth(email, password, isSignup)),
		toSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

