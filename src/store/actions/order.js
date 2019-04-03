import React from 'react';
import Order from '../../components/Order/Order';
import * as actionTypes from './actionTypes';
import axiosinstance from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData)=>{
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData: orderData
	};
}

export const purchaseBurgerFailed = (error) => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAILED,
		error: error
	};
}

export const purchaseBurgerStart  = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START
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
		type: actionTypes.PURCHASE_INIT
	}
}

// export const FETCH_ORDERS_START = 'FETCH_ORDERS_START';
// export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
// export const FETCH_ORDERS_FAIL  = 'FETCH_ORDERS_FAIL';

export const fetchOrdersSucess = (orders)=>({
	type: actionTypes.FETCH_ORDERS_SUCCESS,
	result: orders
});

export const fetchOrdersFail  = (error)=>({
	type: actionTypes.FETCH_ORDERS_FAIL,
	result: error
});

export const fetchOrdersStart = (error)=>({
	type: actionTypes.FETCH_ORDERS_START
});

export const fetchOrders = ()=>{
	return (dispatch) => {
		dispatch(fetchOrdersStart());

		axiosinstance.get('orders.json').then(res =>{
			const OrderArray = Object.keys(res.data);

			let allOrders = [];
			allOrders = OrderArray.map((key)=>{
				const ingredients = res.data[key].ingredients;
				const totalPrice = (+res.data[key].price).toFixed(2);

				console.log(76, ingredients, totalPrice);

				return (<Order key={key} ingredients={ingredients} totalPrice={totalPrice} />);
			});

			dispatch(fetchOrdersSucess({loading: false, orders: allOrders}));
		}).catch(err => {
			dispatch(fetchOrdersFail({error: err, loading: false}));
		});
	}
};
