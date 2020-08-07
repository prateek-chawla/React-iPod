import React, { useEffect, useState } from "react";
import axios from "axios";

import { convertToCelsius } from "../../../utils";
import { key } from "../../../keys.js";
import Spinner from "../../UI/Spinner/Spinner";
import ErrorScreen from "../../UI/Error/Error";

import "./Weather.css";

const Weather = props => {
	const [showSpinner, setShowSpinner] = useState(true);
	const [weatherData, setWeatherData] = useState({});
	const [error, setError] = useState(null);

	useEffect(() => {
		const errorCallback = err => {
			setError(err);
			setShowSpinner(false);
		};
		const successCallback = async position => {
			const latitude = position.coords.latitude;
			const longitude = position.coords.longitude;
			//Fetch Eather Data
			const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
			try {
				const res = await axios.get(url);
				const tempKelvin = res.data.main.temp;
				const temperature = convertToCelsius(tempKelvin);
				const desc = res.data.weather[0].main;
				const icon = res.data.weather[0].icon;
				const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
				setWeatherData({ temperature, desc, iconUrl });
			} catch (err) {
				console.log(err);
				setError("Fetching Weather Data Failed");
				setShowSpinner(false);
			}
		};
		navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
	}, []);

	useEffect(() => {
		// Weather Data has been fetched
		if (Object.keys(weatherData).length > 0) setShowSpinner(false);
	}, [weatherData]);

	const weatherContent = (
		<>
			<img className="weatherIcon" src={weatherData.iconUrl} alt="Weather Icon" />
			<div className="weatherTemp">{weatherData.temperature}</div>
			<div className="weatherDesc">{weatherData.desc}</div>
		</>
	);

	const content = error ? <ErrorScreen error={error} /> : weatherContent;
	return <div className="weather">{showSpinner ? <Spinner /> : content}</div>;
};

export default Weather;
