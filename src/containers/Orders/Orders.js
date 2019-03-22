import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axiosinstance from '../../axios-orders';

class Orders extends Component {
	constructor(props){
		super(props);

		this.state = {
			orders: [],
			loading: true
		}
	}
	
	componentDidMount(){
		axiosinstance.get('orders.json').then(res =>{
			const OrderArray = Object.keys(res.data);

			let allOrders = [];
			allOrders = OrderArray.map((key)=>{
				console.log(key);
				console.log(res.data[key]);
				const ingredients = res.data[key].ingredients;
				const totalPrice = (+res.data[key].price).toFixed(2);

				return (<Order key={key} ingredients={ingredients} totalPrice={totalPrice} />);
			});

			this.setState({loading: false, orders: allOrders});
		}).catch(err => {
			this.setState({loading: false});
		});
	}

	render (){
		return (
			<div>
				{this.state.orders}
			</div>
		);
	}
}

export default Orders;

