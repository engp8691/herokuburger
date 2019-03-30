import * as actions from './actionTypes';
import axiosinstance from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData)=>{
	return {
		type: actions.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData: orderData
	};
}

export const purchaseBurgerFailed = (error) => {
	return {
		type: actions.PURCHASE_BURGER_FAILED,
		error: error
	};
}

export const purchaseBurgerStart  = () => {
	return {
		type: actions.PURCHASE_BURGER_START
	};
}

export const purchaseBurger = (orderData) => {
	return (dispatch) => {
		dispatch(purchaseBurgerStart());

		axiosinstance.post('/orders.json', orderData).then(
			response=>{
				dispatch(purchaseBurgerSuccess(response.data.name, orderData));
			}).catch(err=>{
				dispatch(purchaseBurgerFailed(err));
			});
	}
}

export const purchaseInit = ()=>{
	return {
		type: actions.PURCHASE_INIT
	}
}


