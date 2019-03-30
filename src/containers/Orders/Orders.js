import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Orders extends Component {
	componentDidMount(){
		this.props.fetchOrders();
	}

	render (){
		return (
			<div>
				{this.props.orders}
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps)=>({
	orders: state.orderReducer.orders,
	loading: state.orderReducer.loading
});

const mapDispatchToProps = (dispatch, ownProps)=>({
	fetchOrders: ()=>{dispatch(actions.fetchOrders())}
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);

