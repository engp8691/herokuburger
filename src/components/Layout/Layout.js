import React from 'react';
import './Layout.css';
import BurgerBuilder from '../../containers/BurgerBuilder/BurgerBuilder';

const layout = (props)=>(
	<>
	<div>Toolbar, SideDrawer, Backdrop</div>
	<main className="Content">
		<BurgerBuilder />
	</main>
	</>
);

export default layout;
