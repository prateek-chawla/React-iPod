import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";

import ErrorScreen from "../../../UI/Error/Error";
import Spinner from "../../../UI/Spinner/Spinner";
import Grid from "../../../UI/Grid/Grid";

import * as actions from "../../../../store/actions";

import "./MusicLibrary.css";

const MusicLibrary = props => {
	// Cuurent Track Selection
	const currentTrackRef = useRef(null);
	const { currentTrackID, fetchTracks } = props;

	// Fetch Songs from Napster API
	useEffect(() => {
		fetchTracks();
	}, [fetchTracks]);

	// Scroll when a new track is selected
	useEffect(() => {
		if (currentTrackRef.current)
			currentTrackRef.current.scrollIntoView(false, { behaviour: "smooth" });
	}, [currentTrackID]);

	let spinner = (
		<div className="centerSpinner">
			<Spinner />
		</div>
	);

	let musicLibrary = (
		<Grid nCols={3} gap={"0.5rem"} rowHeight={"85px"}>
			{/* Music Library Tracks from Napster API */}
			{props.tracks &&
				props.tracks.map(track => {
					const trackProperties = {};
					// Check if this track is the one currently selected
					if (track.id === props.currentTrackID) {
						trackProperties.className = "track activeTrack";
						trackProperties.ref = currentTrackRef;
					}

					return (
						<div className="track inactiveTrack" key={track.id} {...trackProperties}>
							<div className="trackName">{track.name}</div>
							<img className="trackImage" alt={track.name} src={track.imageUrl} />
						</div>
					);
				})}
		</Grid>
	);

	if (props.error) {
		musicLibrary = <ErrorScreen error={"Error Fetching Music"} />;
	}

	return props.loading ? spinner : musicLibrary;
};

const mapStateToProps = state => {
	return {
		loading: state.music.loading,
		tracks: state.music.tracks,
		error: state.music.error,
		currentTrackID: state.music.currentTrackID,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchTracks: () => dispatch(actions.fetchTracks()),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(MusicLibrary);
