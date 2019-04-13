import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../../store/actions/index';
import classes from './NavigationItem.module.css';

const navigationItem = (props) => {
// this line use redux store for the interface state
// 22             onClick={props.linkClickHanler}>{props.children}</NavLink>
// This use the closeHandler prop passed all the way from layout to sidedrawer to navigationitems to navigationitem
// 22             onClick={props.linkageClicked}>{props.children}</NavLink>

	return (
	<li className={classes.NavigationItem}>
		<NavLink
			to={props.link}
			exact={props.exact}
			activeClassName={classes.active}
			onClick={props.linkageClicked}>{props.children}</NavLink>
	</li>
	);
}

const mapDispatchToProps = (dispatch, ownProps)=>{
	return {
		linkClickHanler: () => dispatch(actions.toggleSideDrawer(false))
	}
}

export default connect(null, mapDispatchToProps)(navigationItem);

