import React from "react";

import Toggler from "../../../UI/Toggler/Toggler";

import "./Setting.css";

// Individual Setting Component
const Setting = props => {

	// Styling for Active Selection
	const styles = props.active ? "Setting activeSetting" : "Setting";
	const icon = props.active ? <i className="fas fa-angle-right"></i> : null;

	return (
		<div className={styles}>
			<div className="SettingTitle">
				{icon}
				{props.title}
			</div>
			{/* Toggle Switch */}
			<Toggler isOn={props.isOn}/>
		</div>
	);
};

export default Setting;
