import React, {Component} from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';

import BurgerBuilder from '../../containers/BurgerBuilder/BurgerBuilder';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

import './Layout.css';

class Layout extends Component {
	constructor(props){
		super(props);

		this.state = {
			showSideDrawer: true
		}
	}

	sideDrawerClosedHandler = ()=>{
		this.setState({showSideDrawer: false});
	}

	render(){
		return (
			<>
				<Toolbar />
				<SideDrawer 
					closehandler = {this.sideDrawerClosedHandler} 
					open = {this.state.showSideDrawer}
				/>
				<main className="Content">
					<BurgerBuilder />
				</main>
			</>
		)
	}
}

export default Layout;
