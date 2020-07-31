import React from "react";

import "./IpodFrame.css";
import Wheel from "../Wheel/Wheel";
import DisplayScreen from "../DisplayScreen/DisplayScreen";

const ipodFrame = props => {
	return (
		<div className="IpodFrame">
			<DisplayScreen />
			<Wheel />
		</div>
	);
};

export default ipodFrame;
