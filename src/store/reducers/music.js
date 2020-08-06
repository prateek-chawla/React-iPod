// Reducer for Music
import * as actionTypes from "../actions/actionTypes";

const initialState = {
	tracks: null,
	loading: false,
	error: null,
	currentTrackIndex: 0,
	currentTrackID: null,

	isNowPlayingOpen: false,
	nowPlayingTrack: null,
	togglePlay: 0,
};

let newCurrentTrackIndex = null;

const musicReducer = (state = initialState, action) => {
	if (action.type === actionTypes.RESET_NOW_PLAYING) {
		return {
			...state,
			isNowPlayingOpen: false,
			nowPlayingTrack: null,
		};
	}

	if (!action.isAppDrawerOpen && action.currentMenuItem === "Music") {
		switch (action.type) {
			case actionTypes.FETCH_TRACKS_START:
				return {
					...state,
					loading: true,
				};
			// Set Tracks Object
			case actionTypes.FETCH_TRACKS_SUCCESS:
				return {
					...state,
					loading: false,
					tracks: action.tracks,
					currentTrackIndex: 0,
					currentTrackID: action.tracks[0].id,
				};
			// Set Error On Failure
			case actionTypes.FETCH_TRACKS_FAILED:
				return {
					...state,
					loading: false,
					error: action.error,
				};
			// Move Forward in Music Library
			case actionTypes.MOVE_FORWARD:
				if (state.loading) return state;
				newCurrentTrackIndex = (state.currentTrackIndex + 1) % state.tracks.length;

				return {
					...state,
					currentTrackIndex: newCurrentTrackIndex,
					currentTrackID: state.tracks[newCurrentTrackIndex].id,
				};
			// Move Backward in Music Library
			case actionTypes.MOVE_BACKWARD:
				if (state.loading) return state;
				newCurrentTrackIndex =
					(state.currentTrackIndex - 1 + state.tracks.length) % state.tracks.length;

				return {
					...state,
					currentTrackIndex: newCurrentTrackIndex,
					currentTrackID: state.tracks[newCurrentTrackIndex].id,
				};
			// Toggle Play/Pause
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
			// eslint-disable-line no-fallthrough
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
			// eslint-disable-line no-fallthrough
			default:
				return state;
		}
	}
	return state;
};

export default musicReducer;
