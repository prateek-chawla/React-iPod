import React from "react";
import { connect } from "react-redux";

// Components to be displayed on screen
import NotificationBar from "../DisplayItems/NotificationBar/NotificationBar"
import AppDrawer from "../DisplayItems/AppDrawer/AppDrawer";
import Weather from "../DisplayItems/Weather/Weather";
import Music from "../DisplayItems/Music/Music";
import Games from "../DisplayItems/Games/Games";
import Settings from "../DisplayItems/Settings/Settings";

import "./DisplayScreen.css";

// Menu item Components
const MenuItems = {
	Weather,
	Music,
	Games,
	Settings,
};

const displayScreen = props => {
	// Current Menu Item Component
	const MenuItem = MenuItems[props.currentMenuItem] ;
	return (
		<div className="displayScreen">
			<NotificationBar />
			{/* Show either AppDrawer or an App */}
			{props.isAppDrawerOpen ? <AppDrawer /> : <MenuItem />}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		isAppDrawerOpen: state.appDrawer.isAppDrawerOpen,
		currentMenuItem: state.appDrawer.currentMenuItem,
	};
};

export default connect(mapStateToProps, null)(displayScreen);
