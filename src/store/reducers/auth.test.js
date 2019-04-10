import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
	it('Should return the initial state', ()=>{
		expect(reducer(undefined, {type: actionTypes.AUTH_START})).toEqual({
			token: null,
			userId: null,
			error: null,
			loading: true,
			authRedirectPath: '/'
		});
	});
});
