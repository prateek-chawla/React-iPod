export const convertToCelsius = kelvinTemp => {
	return parseFloat((kelvinTemp - 273.15).toFixed(1)) + "°C";
};
