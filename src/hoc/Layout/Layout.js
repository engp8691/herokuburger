import React, {Component} from 'react';
import { connect } from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import classes from './Layout.module.css';

class Layout extends Component {
	constructor(props){
		super(props);

		this.state = {
			showSideDrawer: false
		}
	}

	sideDrawerClosedHandler = ()=>{
		this.setState({showSideDrawer: false});
	}

	sideDrawerToggleHandler = ()=>{
		this.setState((prevState)=>{
			return {showSideDrawer: !prevState.showSideDrawer}
		});
	}

	render(){
		return (
			<>
				<Toolbar isAuthenticated = {this.props.isAuthenticated} showSideDraw={this.sideDrawerToggleHandler} />
				{
					this.state.showSideDrawer ? (<SideDrawer isAuthenticated = {this.props.isAuthenticated} closehandler = {this.sideDrawerClosedHandler} open = {this.state.showSideDrawer} />) : null
				}

				<main className={classes.Content}>
					{this.props.children}
				</main>
			</>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return{
		isAuthenticated: state.authReducer.token !== null
	}
}

export default connect(mapStateToProps, null)(Layout);

