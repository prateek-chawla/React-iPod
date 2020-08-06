import React, { useState, useEffect } from "react";

import "./NotificationBar.css";

const NotificationBar = props => {
	// Clock
	const [time, setTime] = useState(null);

	useEffect(() => {
		// Update time every Second
		const timer = setInterval(() => {
			setTime(
				new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
			);
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, []);
	return (
		<div className="NotificationBar">
			{/* Clock */}
			<div className="time">{time}</div>
			{/* Wifi and Battery Icons */}
			<div className="icons">
				<i className="fas fa-battery-half" />
				<i className="fas fa-wifi" />
			</div>
		</div>
	);
};

export default NotificationBar;
