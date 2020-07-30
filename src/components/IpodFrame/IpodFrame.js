import React from "react";

import "./IpodFrame.css";
import Wheel from "../Wheel/Wheel";

const ipodFrame = props => {
	return (
		<div className="IpodFrame">
			{/* ScreenDisplay */}
			<Wheel />
		</div>
	);
};

export default ipodFrame;
