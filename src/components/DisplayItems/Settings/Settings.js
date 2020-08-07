import React from "react";
import { connect } from "react-redux";

import Setting from "./Setting/Setting";

import "./Settings.css";

const settings = props => {
	return (
		<div className="Settings">

			{/* Setting Icon on Top */}
			<div className="SettingsIcon">
				<i className="fas fa-cog"></i>
			</div>

			{/* Individual Settings */}
			<Setting
				title="Dark Mode"
				active={props.currentSetting === "Dark Mode"}
				isOn={props.isDarkModeOn}
			/>
			<Setting
				title="Night Light"
				active={props.currentSetting === "Night Light"}
				isOn={props.isNightLightOn}
			/>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		isNightLightOn: state.settings.isNightLightOn,
		isDarkModeOn: state.settings.isDarkModeOn,
		currentSetting: state.settings.currentSetting,
	};
};

export default connect(mapStateToProps)(settings);
