import { put, takeLatest, delay } from 'redux-saga/effects';
import * as actionTypes from '../../store/actions/actionTypes'; 
import * as actions from '../../store/actions/index';
import axiosinstance from '../../axios-orders';

export function* logoutSaga(action) {
	yield localStorage.setItem('token', '');
	yield localStorage.setItem('localId', '');
	yield localStorage.setItem('expirationDate', '');

	yield put(actions.authLogoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
	yield delay(action.expiresIn);
	yield put(actions.authLogout());
}

export function* loginSaga(action) {
	yield put(actions.authStart());

	const authData = {
		email: action.email,
		password: action.password,
		returnSecureToken: true
	};

	let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyD8EN0WOAKFkby41VXc32J7lugZKk19RKk';
	if(!action.isSignup){
		url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyD8EN0WOAKFkby41VXc32J7lugZKk19RKk';
	}

	try{
		const response = yield axiosinstance.post(url, authData);
	
		const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn*1000);
		yield localStorage.setItem('token', response.data.idToken);
		yield localStorage.setItem('expirationDate', expirationDate);
		yield localStorage.setItem('localId', response.data.localId);

		yield put(actions.authSuccess(response.data.idToken, response.data.localId));
		yield put(actions.checkAuthTimeout(response.data.expiresIn*1000));
	}catch(err){
		yield put(actions.authFail(err.response.data.error.message));
    }
}

export function* authCheckStateSaga(action){
	const token = yield localStorage.getItem('token');
	if(!token){
		yield put(actions.authLogout());
	}else{
		const expirationDate = yield new Date(localStorage.getItem('expirationDate'));

		if(expirationDate < new Date()){
			yield put(actions.authLogout());
		}else{
			const localId = yield localStorage.getItem('localId');
			yield put(actions.authSuccess(token, localId));
            yield put(actions.checkAuthTimeout(expirationDate.getTime() - new Date().getTime()));
        }
    }
}

export function* authSaga() {
	yield takeLatest(actionTypes.AUTH_LOGIN_REQUESTED, loginSaga);
	yield takeLatest(actionTypes.AUTH_LOGOUT_REQUESTED, logoutSaga);
	yield takeLatest(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
	yield takeLatest(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
}

