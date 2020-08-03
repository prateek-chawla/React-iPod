import React, { useEffect, useState } from "react";
import axios from "axios";

import { convertToCelsius } from "../../../utils";
import {key} from '../../../keys.js'
import Spinner from "../../UI/Spinner/Spinner";

import "./Weather.css";

const Weather = props => {
	const [showSpinner, setShowSpinner] = useState(true);
	const [weatherData, setWeatherData] = useState({});

	useEffect(() => {
		const errorCallback = err => console.log(err);
		const successCallback = position => {
			const latitude = position.coords.latitude;
			const longitude = position.coords.longitude;

			const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

			axios
				.get(url)
				.then(res => {
					const tempKelvin = res.data.main.temp;
					const temperature = convertToCelsius(tempKelvin);
					const desc = res.data.weather[0].main;
					const icon = res.data.weather[0].icon;
					const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
					setWeatherData({ temperature, desc, iconUrl });
					setShowSpinner(false);
				})
				.catch(err => console.log(err));
		};
		navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
	}, []);

	const weatherContent = (
		<>
			<img className="weatherIcon" src={weatherData.iconUrl} alt="Weather Icon" />
			<div className="weatherTemp">{weatherData.temperature}</div>
			<div className="weatherDesc">{weatherData.desc}</div>
		</>
	);
	return <div className="weather">{showSpinner ? <Spinner /> : weatherContent}</div>;
};

export default Weather;
