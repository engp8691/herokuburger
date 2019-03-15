import React, {Component} from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

import BurgerBuilder from '../../containers/BurgerBuilder/BurgerBuilder';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import './Layout.css';

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
				<Toolbar showSideDraw={this.sideDrawerToggleHandler} />
				{
					this.state.showSideDrawer ? (<SideDrawer closehandler = {this.sideDrawerClosedHandler} open = {this.state.showSideDrawer} />) : null
				}

				<main className="Content">
					<BurgerBuilder />
				</main>
			</>
		)
	}
}

export default Layout;
