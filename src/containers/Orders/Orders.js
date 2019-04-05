import React, { Component } from 'react';
import { connect } from 'react-redux';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axiosinstance from '../../axios-orders';
import * as actions from '../../store/actions/index';

class Orders extends Component {
	constructor(props){
		super(props);
		console.log(8);

		this.props.fetchOrders(this.props.token);
	}

	componentDidMount(){
		console.log(14);
		this.props.fetchOrders(this.props.token);
	}

	render (){
		console.log(17, this.props.orders);

		if(this.props.orders){
			return (
				<div>
					{this.props.orders}
				</div>
			);
		}else{
			return null;
		}
	}
}

const mapStateToProps = (state, ownProps)=>({
	orders: state.orderReducer.orders,
	loading: state.orderReducer.loading,
	token: state.authReducer.token
});

const mapDispatchToProps = (dispatch, ownProps)=>({
	fetchOrders: (token)=>{dispatch(actions.fetchOrders(token))}
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axiosinstance));

