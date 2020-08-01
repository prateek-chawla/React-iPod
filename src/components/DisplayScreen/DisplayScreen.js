import React from "react";
import { connect } from "react-redux";

import AppDrawer from "../DisplayItems/AppDrawer/AppDrawer";

import "./DisplayScreen.css";

const displayScreen = props => {
	return (
		<div className="displayScreen">
			{props.isAppDrawerOpen ? <AppDrawer /> : props.currentMenuItem}
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
