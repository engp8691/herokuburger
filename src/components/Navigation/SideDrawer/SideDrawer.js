import React from 'react';
import Logo from '../../Logo/Logo';
import Backdrop from '../../UI/Backdrop/Backdrop';
import NavigationItems from '../NavigationItems/NavigationItems';

import classes from './SideDrawer.module.css';

const sideDrawer = (props)=>{
	let attachedClasses = [classes.SideDrawer, classes.Close];
	if(props.open){
		attachedClasses = [classes.SideDrawer, classes.Open];
	}

	return (
		<>
			<Backdrop backdropClicked={props.closehandler} show={props.open} />
			<div className={attachedClasses.join(' ')}>
				<div className={classes.Logo}>
					<Logo />
				</div>
				<nav>
					<NavigationItems />
				</nav>
			</div>
		</>
	);
};

export default sideDrawer;

