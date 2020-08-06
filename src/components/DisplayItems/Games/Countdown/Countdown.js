import React, { useState, useEffect } from "react";

import "./Countdown.css";

const Countdown = props => {
	// Countdown timer
	const [timer, setTimer] = useState(props.seconds);

	useEffect(() => {
		// Update timer every second
		const decrementCountdown = setInterval(() => {
			setTimer(prevTimer => prevTimer - 1);
		}, 1000);

		// Clear interval on unmount 
		return () => {
			clearInterval(decrementCountdown);
		};
	}, []);

	return (
		<div className="container">
			<div className="countdown">{timer}</div>
		</div>
	);
};

export default Countdown;
