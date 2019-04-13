import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.module.css';

const navigationItems = (props)=>{
	let login = (<NavigationItem link="/auth" linkageClicked={props.linkageClicked}>Authenticate</NavigationItem>);
	let logout = (<NavigationItem link="/logout" linkageClicked={props.linkageClicked}>Logout</NavigationItem>);
	let option = props.isAuthenticated ? logout : login;

	return (
	<ul className={classes.NavigationItems}>
		<NavigationItem link="/" exact linkageClicked={props.linkageClicked}>Burger Builder</NavigationItem>
		{props.isAuthenticated ? <NavigationItem link="/orders" linkageClicked={props.linkageClicked} caobi="shejing">Orders</NavigationItem> : null}
		{option}
	</ul>
	);
}

export default navigationItems;

