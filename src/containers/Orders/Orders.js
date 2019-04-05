import React, { Component } from 'react';
import { connect } from 'react-redux';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axiosinstance from '../../axios-orders';
import * as actions from '../../store/actions/index';

class Orders extends Component {
	constructor(props){
		super(props);

		this.props.fetchOrders(this.props.token);
	}

	componentDidMount(){
		this.props.fetchOrders(this.props.token);
	}

	render (){
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

