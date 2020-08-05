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
	currentTrackIndex: 0,
	currentTrackID: null,

	isNowPlayingOpen: false,
	nowPlayingTrack: null,
	togglePlay: 0,
};

let newMenuItemIndex, newCurrentTrackIndex;

const appDrawerReducer = (state = initialState, action) => {
	if (action.type === actionTypes.MENU_PRESSED) {
		return {
			...state,
			isAppDrawerOpen: true,
		};
	}
	if (action.type === actionTypes.RESET_NOW_PLAYING) {
		return {
			...state,
			isNowPlayingOpen: false,
			nowPlayingTrack: null,
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
					currentTrackIndex: 0,
					currentTrackID: action.tracks[0].id,
				};
			case actionTypes.FETCH_TRACKS_FAILED:
				return {
					...state,
					loading: false,
					error: action.error,
				};
			case actionTypes.MOVE_FORWARD:
				if (state.loading) return state;
				newCurrentTrackIndex = (state.currentTrackIndex + 1) % state.tracks.length;

				return {
					...state,
					currentTrackIndex: newCurrentTrackIndex,
					currentTrackID: state.tracks[newCurrentTrackIndex].id,
				};
			case actionTypes.MOVE_BACKWARD:
				if (state.loading) return state;
				newCurrentTrackIndex =
					(state.currentTrackIndex - 1 + state.tracks.length) % state.tracks.length;

				return {
					...state,
					currentTrackIndex: newCurrentTrackIndex,
					currentTrackID: state.tracks[newCurrentTrackIndex].id,
				};
			case actionTypes.SELECT_PRESSED:
			case actionTypes.PLAY_PAUSE_PRESSED:
				if (state.loading) return state;
				if (state.isNowPlayingOpen) {
					return {
						...state,
						togglePlay: state.togglePlay + 1,
					};
				} else {
					return {
						...state,
						isNowPlayingOpen: true,
						nowPlayingTrack: state.tracks[state.currentTrackIndex],
					};
				}
			case actionTypes.FWD_PRESSED:
				if (state.isNowPlayingOpen) {
					newCurrentTrackIndex = (state.currentTrackIndex + 1) % state.tracks.length;

					return {
						...state,
						currentTrackIndex: newCurrentTrackIndex,
						currentTrackID: state.tracks[newCurrentTrackIndex].id,
						nowPlayingTrack: state.tracks[state.currentTrackIndex],
					};
				}
			case actionTypes.BWD_PRESSED:
				if (state.isNowPlayingOpen) {
					newCurrentTrackIndex =
						(state.currentTrackIndex - 1 + state.tracks.length) %
						state.tracks.length;

					return {
						...state,
						currentTrackIndex: newCurrentTrackIndex,
						currentTrackID: state.tracks[newCurrentTrackIndex].id,
						nowPlayingTrack: state.tracks[state.currentTrackIndex],
					};
				}
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
