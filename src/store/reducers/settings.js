// Reducer for Settings
import * as actionTypes from "../actions/actionTypes";

const initialState = {
	isNightLightOn: false,
	isDarkModeOn: true,
	currentSettingIndex: 0,
	totalSettings: 2,
	settings: ["Dark Mode", "Night Light"],
	currentSetting: "Dark Mode",
};

let newSettingIndex = null;

const settingsReducer = (state = initialState, action) => {
	if (!action.isAppDrawerOpen && action.currentMenuItem === "Settings") {
		switch (action.type) {
			// Toggle Theme
			case actionTypes.TOGGLE_THEME:
				return {
					...state,
					isDarkModeOn: !state.isDarkModeOn,
				};
			// Toggle Night Light
			case actionTypes.TOGGLE_NIGHT_LIGHT:
				return {
					...state,
					isNightLightOn: !state.isNightLightOn,
				};
			// Move Forward
			case actionTypes.MOVE_FORWARD:
				newSettingIndex = (state.currentSettingIndex + 1) % state.totalSettings;
				return {
					...state,
					currentSettingIndex: newSettingIndex,
					currentSetting: state.settings[newSettingIndex],
				};
			// Move Backward
			case actionTypes.MOVE_BACKWARD:
				newSettingIndex =
					(state.currentSettingIndex - 1 + state.totalSettings) %
					state.totalSettings;
				return {
					...state,
					currentSettingIndex: newSettingIndex,
					currentSetting: state.settings[newSettingIndex],
				};
			// Select
			case actionTypes.SELECT_PRESSED:
				const toggledSetting =
					state.currentSetting === "Night Light" ? "isNightLightOn" : "isDarkModeOn";
				const toggledSettingValue = state[toggledSetting];
				return {
					...state,
					[toggledSetting]: !toggledSettingValue,
				};
			default:
				return state;
		}
	}
	return state;
};

export default settingsReducer;
