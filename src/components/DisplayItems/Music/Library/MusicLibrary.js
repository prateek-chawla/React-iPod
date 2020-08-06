import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

import Spinner from '../../../UI/Spinner/Spinner'
import Grid from '../../../UI/Grid/Grid'

import * as actions from '../../../../store/actions'

import "./MusicLibrary.css";

const MusicLibrary = props => {
	const currentTrackRef = useRef(null);
	useEffect(() => {
		props.fetchTracks();
	}, []);

	useEffect(() => {
		if (currentTrackRef.current)
			currentTrackRef.current.scrollIntoView({ behaviour: "smooth" });
	}, [currentTrackRef.current]);

	let spinner = <div className='centerSpinner'><Spinner /></div>

	let musicLibrary = (
		<Grid nCols={3} gap={"0.5rem"} rowHeight={"85px"}>
			{props.tracks &&
				props.tracks.map(track => {
					const trackProperties = {};
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
		console.log(props.error);
		musicLibrary = <div>Error</div>;
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
