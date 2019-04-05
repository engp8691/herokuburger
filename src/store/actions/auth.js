import * as actionTypes from './actionTypes.js';
import axiosinstance from '../../axios-orders';

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	}
}

export const authSuccess = (token, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		token: token,
		userId: userId
	}
}

export const authFail = (errMsg)=>{
	return {
		type: actionTypes.AUTH_FAIL,
		errMsg: errMsg
	}
}

export const authLogout = ()=>{
	console.log("authLogout");
	localStorage.setItem('token', '');
	localStorage.setItem('localId', '');
	localStorage.setItem('expirationDate', '');

	return {
		type: actionTypes.AUTH_LOGOUT
	}
}

export const checkAuthTimeout = (expiresIn)=>{
	return (dispatch)=>{
		setTimeout(()=>{dispatch(authLogout());}, expiresIn);
	}
}

export const auth = (email, password, isSignup) => {
	return (dispatch)=>{
		dispatch(authStart());

		const authData = {
			email: email,
			password: password,
			returnSecureToken: true
		};

		let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyD8EN0WOAKFkby41VXc32J7lugZKk19RKk';
		if(!isSignup){
			url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyD8EN0WOAKFkby41VXc32J7lugZKk19RKk';
		}

		axiosinstance.post(url, authData).then(response=>{
			const expirationDate = new Date(new Date().getTime() + response.data.expiresIn*1000);
			localStorage.setItem('token', response.data.idToken);
			localStorage.setItem('expirationDate', expirationDate);
			localStorage.setItem('localId', response.data.idToken);
			
			dispatch(authSuccess(response.data.idToken, response.data.localId));
			dispatch(checkAuthTimeout(response.data.expiresIn*1000));
			console.log(65, response);
		}).catch(err=>{
			dispatch(authFail(err.response.data.error.message));
		});
	}
}

export const setAuthRedirectPath = (path)=>{
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path: path
	}
}

export const authCheckState = ()=>{
	return (dispatch)=>{
		const token = localStorage.getItem('token');
		if(!token){
			dispatch(authLogout());
		}else{
			const expirationDate = new Date(localStorage.getItem('expirationDate'));

			if(expirationDate < new Date()){
				alert("Caobi");
				dispatch(authLogout());
			}else{
				const localId = localStorage.getItem('localId');
				dispatch(authSuccess(token, localId));
				dispatch(checkAuthTimeout(expirationDate.getTime() - new Date().getTime()));
			}
		}
	}
}

