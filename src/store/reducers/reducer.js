import { combineReducers } from "redux";
import * as actionTypes from "../actions/actionTypes";
const initialState = {
	isAppDrawerOpen: true,
	isMenuItemOpen: false,
	currentMenuItemIndex: 0,
	totalMenuItems: 4,
	menuItems: ["Music", "Games", "Weather", "Settings"],
	currentMenuItem: "Music",
};

let newMenuItemIndex;

const appDrawerReducer = (state = initialState, action) => {
	if (state.isAppDrawerOpen) {
		switch (action.type) {
			case actionTypes.MOVE_FORWARD:
				newMenuItemIndex = (state.currentMenuItemIndex + 1) % state.totalMenuItems;
				return {
					...state,
					currentMenuItemIndex: newMenuItemIndex,
					currentMenuItem: state.menuItems[newMenuItemIndex],
				};
			case actionTypes.MOVE_BACKWARD:
				newMenuItemIndex =
					(state.currentMenuItemIndex - 1 + state.totalMenuItems) %
					state.totalMenuItems;
				return {
					...state,
					currentMenuItemIndex: newMenuItemIndex,
					currentMenuItem: state.menuItems[newMenuItemIndex],
				};

			case actionTypes.SELECT_PRESSED:
				return {
					...state,
					isAppDrawerOpen: false,
				};
			default:
				return { ...state };
		}
	}
	if (action.type === actionTypes.MENU_PRESSED) {
		return {
			...state,
			isAppDrawerOpen: true,
		};
	}
};
export default appDrawerReducer;
