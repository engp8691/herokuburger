import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.module.css';

const navigationItems = (props)=>{
	let login = (<NavigationItem link="/auth" >Authenticate</NavigationItem>);
	let logout = (<NavigationItem link="/logout" >Logout</NavigationItem>);
	let option = props.isAuthenticated ? logout : login;

	return (
	<ul className={classes.NavigationItems}>
		<NavigationItem link="/" exact>Burger Builder</NavigationItem>
		{props.isAuthenticated ? <NavigationItem link="/orders" >Orders</NavigationItem> : null}
		{option}
	</ul>
	);
}

export default navigationItems;

