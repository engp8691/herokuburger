import React, {useState} from 'react';
import { connect } from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import * as actions from '../../store/actions/index';

import classes from './Layout.module.css';

const layout = (props) => {
	const [sideDrawerVisible, setSideDrawerVisible] = useState(false);

	const sideDrawerClosedHandler = ()=>{
		props.bringUpSideDrawer(false);
		setSideDrawerVisible(false);
	};

	const sideDrawerToggleHandler = ()=>{
		props.bringUpSideDrawer(true);
		setSideDrawerVisible(true);
	};

	let sideDrawer = (<SideDrawer isAuthenticated={props.isAuthenticated} closehandler={sideDrawerClosedHandler} open={props.sideDrawerVisible} />);
	sideDrawer = (props.sideDrawerVisible || sideDrawerVisible) ? sideDrawer : null;

	return (
		<>
			<Toolbar isAuthenticated = {props.isAuthenticated} showSideDraw={sideDrawerToggleHandler} />
			{ sideDrawer }
			<main className={classes.Content}>
				{props.children}
			</main>
		</>
	)
}

const mapStateToProps = (state, ownProps) => {
	return{
		isAuthenticated: state.authReducer.token !== null,
		sideDrawerVisible: state.authReducer.sideDrawerVisible
	}
}

const mapDispatchToProps = (dispatch, ownProps)=>{
	return {
		bringUpSideDrawer: (visibleFlag) => dispatch(actions.toggleSideDrawer(visibleFlag))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(layout);

