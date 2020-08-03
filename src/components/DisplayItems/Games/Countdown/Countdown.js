import React, { useState, useEffect } from "react";

import "./Countdown.css";

const Countdown = props => {
	const [timer, setTimer] = useState(props.seconds);

	useEffect(() => {
		const decrementCountdown = setInterval(() => {
			setTimer(prevTimer => prevTimer - 1);
		}, 1000);

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
