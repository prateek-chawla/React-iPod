import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";

// Components to be displayed on screen
import NotificationBar from "../DisplayItems/NotificationBar/NotificationBar";
import AppDrawer from "../DisplayItems/AppDrawer/AppDrawer";
import Weather from "../DisplayItems/Weather/Weather";
import Music from "../DisplayItems/Music/Music";
import Games from "../DisplayItems/Games/Games";
import Settings from "../DisplayItems/Settings/Settings";

import Overlay from "../UI/Overlay/Overlay";

import "./DisplayScreen.css";

// Menu item Components
const MenuItems = {
	Weather,
	Music,
	Games,
	Settings,
};

const DisplayScreen = props => {
	const screenRef = useRef(null);
	const { isDarkModeOn, isNightLightOn, isAppDrawerOpen, currentMenuItem } = props;

	// Dark Mode is On by default
	useEffect(() => {
		screenRef.current.classList.toggle("dark");
	}, [isDarkModeOn]);

	// Add a Dark Overlay if Night Light is on
	const overlay = isNightLightOn ? <Overlay /> : null;

	// Current Menu Item Component
	const MenuItem = MenuItems[currentMenuItem];

	return (
		<div className="displayScreen" ref={screenRef}>
			{overlay}
			<NotificationBar />
			{isAppDrawerOpen ? <AppDrawer /> : <MenuItem />}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		isAppDrawerOpen: state.appDrawer.isAppDrawerOpen,
		currentMenuItem: state.appDrawer.currentMenuItem,
		isNightLightOn: state.settings.isNightLightOn,
		isDarkModeOn: state.settings.isDarkModeOn,
	};
};

export default connect(mapStateToProps, null)(DisplayScreen);
