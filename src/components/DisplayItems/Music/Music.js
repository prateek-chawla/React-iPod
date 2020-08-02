import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Music.css";

const Music = props => {
	useEffect(() => {
		axios
			.get(
				`https://api.napster.com/v2.1/tracks/top?apikey=ZTk2YjY4MjMtMDAzYy00MTg4LWE2MjYtZDIzNjJmMmM0YTdm`
			)
			.then(res => console.log(res.data))
			.catch(err => console.log(err));
	}, []);
	return "Music"
};

export default Music;
