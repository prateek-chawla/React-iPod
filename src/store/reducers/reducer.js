// import { combineReducers } from "redux";
import * as actionTypes from "../actions/actionTypes";
const initialState = {
	isAppDrawerOpen: true,
	isMenuItemOpen: false,
	currentMenuItemIndex: 0,
	totalMenuItems: 4,
	menuItems: ["Music", "Games", "Weather", "Settings"],
	currentMenuItem: "Music",

	gameMoveUp: 0,
	gameMoveDown: 0,
	gameSelectPressed: 0,

	tracks: null,
	loading: false,
	error: null,
	cuurentTrackIndex: 0,
	currentTrackID: null,
};

let newMenuItemIndex, newCurrentTrackIndex;

const appDrawerReducer = (state = initialState, action) => {
	if (action.type === actionTypes.MENU_PRESSED) {
		return {
			...state,
			isAppDrawerOpen: true,
		};
	}
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
				return state;
		}
	}
	if (!state.isAppDrawerOpen && state.currentMenuItem === "Music") {
		switch (action.type) {
			case actionTypes.FETCH_TRACKS_START:
				return {
					...state,
					loading: true,
				};
			case actionTypes.FETCH_TRACKS_SUCCESS:
				return {
					...state,
					loading: false,
					tracks: action.tracks,
					cuurentTrackIndex: 0,
					currentTrackID: action.tracks[0].id,
				};
			case actionTypes.FETCH_TRACKS_FAILED:
				return {
					...state,
					loading: false,
					error: action.error,
				};
			case actionTypes.MOVE_FORWARD:
				if(!state.tracks)
					return state
				newCurrentTrackIndex = (state.cuurentTrackIndex + 1) % state.tracks.length;
				return {
					...state,
					cuurentTrackIndex: newCurrentTrackIndex,
					currentTrackID:state.tracks[newCurrentTrackIndex].id
				};
			case actionTypes.MOVE_BACKWARD:
				if(!state.tracks)
					return state
				newCurrentTrackIndex = (state.cuurentTrackIndex - 1) % state.tracks.length;
				return {
					...state,
					cuurentTrackIndex: newCurrentTrackIndex,
					currentTrackID:state.tracks[newCurrentTrackIndex].id
				};
		}
	}
	if (!state.isAppDrawerOpen && state.currentMenuItem === "Games") {
		switch (action.type) {
			case actionTypes.MOVE_FORWARD:
				return {
					...state,
					gameMoveUp: state.gameMoveUp + 1,
				};
			case actionTypes.MOVE_BACKWARD:
				return {
					...state,
					gameMoveDown: state.gameMoveDown + 1,
				};
			case actionTypes.SELECT_PRESSED:
				return {
					...state,
					gameSelectPressed: state.gameSelectPressed + 1,
				};
			default:
				return state;
		}
	}
	return state;
};
export default appDrawerReducer;
