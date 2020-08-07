export const convertToCelsius = kelvinTemp => {
	return parseFloat((kelvinTemp - 273.15).toFixed(1)) + "°C";
};

// Format time in hh:mm:ss format
export const formatTime = time => {
	const timeInSeconds = parseInt(time);
	const ss = addPadding(parseInt(timeInSeconds % 60));
	const mins = parseInt(timeInSeconds / 60);
	const mm = addPadding(parseInt(mins % 60));
	const hours = parseInt(mins / 60);
	const hh = addPadding(parseInt(hours % 60));
	return hh > 0 ? `${hh}:${mm}:${ss}` : `${mm}:${ss}`;
};

const addPadding = num => {
	return num < 10 ? "0" + num : num;
};
