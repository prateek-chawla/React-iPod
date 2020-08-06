import * as actionTypes from "../actions/actionTypes";

const initialState = {
	isAppDrawerOpen: true,
	currentMenuItemIndex: 0,
	totalMenuItems: 4,
	menuItems: ["Music", "Games", "Weather", "Settings"],
	currentMenuItem: "Music",
};

let newMenuItemIndex = null;

const appDrawerReducer = (state = initialState, action) => {
	if (action.type === actionTypes.MENU_PRESSED) {
		return {
			...state,
			isAppDrawerOpen: true,
		};
	}
	if (action.isAppDrawerOpen) {
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
				return state;
		}
    }
    return state
};

export default appDrawerReducer;
