import * as actionTypes from './actionTypes.js';

// no more thunk as middle ware here
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

export const authLogoutRequested = ()=>{
	return {
		type: actionTypes.AUTH_LOGOUT_REQUESTED
	}
}

export const authLogout = ()=>{
	return {
		type: actionTypes.AUTH_LOGOUT_REQUESTED
	}
}

export const authLogoutSucceed = ()=>{
	return {
		type: actionTypes.AUTH_LOGOUT
	}
}

export const checkAuthTimeout = (expiresIn)=>{
	return {
		type: actionTypes.AUTH_CHECK_TIMEOUT,
		expiresIn: expiresIn
	}
}

export const auth = (email, password, isSignup) => {
	return {
		type: actionTypes.AUTH_LOGIN_REQUESTED,
		email: email,
		password: password,
		isSignup: isSignup
	}
}

export const setAuthRedirectPath = (path)=>{
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path: path
	}
}

export const authCheckState = ()=>{
	return {
		type: actionTypes.AUTH_CHECK_STATE
	}
}

export const toggleSideDrawer = (sideDrawerVisible)=>{
	return {
		type: actionTypes.SIDEDRAWER_VISIBILITY,
		sideDrawerVisible: sideDrawerVisible
	}
}

