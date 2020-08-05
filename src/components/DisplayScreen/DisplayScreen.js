import React from "react";
import { connect } from "react-redux";

import NotificationBar from "../DisplayItems/NotificationBar/NotificationBar"
import AppDrawer from "../DisplayItems/AppDrawer/AppDrawer";
import Weather from "../DisplayItems/Weather/Weather";
import Music from "../DisplayItems/Music/Music";
import Games from "../DisplayItems/Games/Games";
import Settings from "../DisplayItems/Settings/Settings";

import "./DisplayScreen.css";

const MenuItems = {
	Weather,
	Music,
	Games,
	Settings,
};

const displayScreen = props => {
	const MenuItem = MenuItems[props.currentMenuItem] ;
	return (
		<div className="displayScreen">
			<NotificationBar />
			{props.isAppDrawerOpen ? <AppDrawer /> : <MenuItem />}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		isAppDrawerOpen: state.isAppDrawerOpen,
		currentMenuItem: state.currentMenuItem,
	};
};

export default connect(mapStateToProps, null)(displayScreen);
