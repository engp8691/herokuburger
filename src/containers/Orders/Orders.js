import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Orders extends Component {
	constructor(props){
		super(props);
		console.log(8);

		this.props.fetchOrders();
	}

	componentDidMount(){
		console.log(14);
		this.props.fetchOrders();
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
	loading: state.orderReducer.loading
});

const mapDispatchToProps = (dispatch, ownProps)=>({
	fetchOrders: ()=>{dispatch(actions.fetchOrders())}
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);

