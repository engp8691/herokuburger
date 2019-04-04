import * as actionTypes from './actionTypes.js';
import axiosinstance from '../../axios-orders';

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	}
}

export const authSuccess = (authData) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		authData: authData
	}
}

export const authFail = (error)=>{
	return {
		type: actionTypes.AUTH_FAIL,
		error: error
	}
}

export const auth = (email, password) => {
	return (dispatch)=>{
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true
		};

		console.log(authData);

axiosinstance.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyD8EN0WOAKFkby41VXc32J7lugZKk19RKk', authData).then(
	response=>{
		console.log(30, response);
	}).catch(err=>{
		console.log(33, err);
	});
	}
}

