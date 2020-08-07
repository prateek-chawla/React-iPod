// Action Creators for Settings
import * as actionTypes from "./actionTypes";

export const toggleNightLight = () => {
	return {
		type: actionTypes.TOGGLE_NIGHT_LIGHT,
	};
};

export const toggleTheme = () => {
	return {
		type: actionTypes.TOGGLE_THEME,
	};
};
