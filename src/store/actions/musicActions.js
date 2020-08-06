// Action Creators for Music
import axios from "axios";
import * as actionTypes from "./actionTypes";

import { napsterKey } from "../../keys";

const fetchTracksStart = () => {
	return {
		type: actionTypes.FETCH_TRACKS_START,
	};
};

const fetchTracksSuccessful = tracks => {
	return {
		type: actionTypes.FETCH_TRACKS_SUCCESS,
		tracks: tracks,
	};
};

const fetchTracksFailed = error => {
	return {
		type: actionTypes.FETCH_TRACKS_FAILED,
		error,
	};
};

export const fetchTracks = () => {
	return dispatch => {
		dispatch(fetchTracksStart());
		formatTracks(dispatch);
	};
};

// Fetch and Format Tracks Object
const formatTracks = async dispatch => {
	try {
		const response = await axios.get(
			`https://api.napster.com/v2.1/tracks/top?limit=12&apikey=${napsterKey}`
		);
		const tracksData = response.data.tracks;
		const tracks = [];
		for (const trackData of tracksData) {
			const track = {};
			track.id = trackData.id;
			track.songUrl = trackData.previewURL;
			track.name = trackData.name;
			track.artist = trackData.artistName;
			const albumUrl = await trackData.links.albums.href;
			const albumData = await axios.get(albumUrl + `?apikey=${napsterKey}`);
			const imageUrl = albumData.data.albums[0].links.images.href;

			const imageData = await axios.get(imageUrl + `?apikey=${napsterKey}`);
			track.imageUrl = imageData.data.images[0].url;

			tracks.push(track);
		}

		dispatch(fetchTracksSuccessful(tracks));
	} catch (error) {
		dispatch(fetchTracksFailed(error));
	}
};

export const resetNowPlaying = () => {
	return {
		type: actionTypes.RESET_NOW_PLAYING,
	};
};
