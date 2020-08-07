import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import { formatTime } from "../../../../utils";

import * as actions from "../../../../store/actions";

import "./NowPlaying.css";

const NowPlaying = props => {
	const trackRef = useRef(null);
	const { resetNowPlaying, track } = props;

	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState("00:00");

	useEffect(() => {
		// Update current playback time
		const updateCurrentTime = setInterval(() => {
			setCurrentTime(trackRef.current.currentTime);
			if (trackRef.current.currentTime === trackRef.current.duration)
				setIsPlaying(false);
		}, 500);

		return () => {
			clearInterval(updateCurrentTime);
		};
	}, []);

	useEffect(() => {
		// Reset Current Track when exiting
		return () => {
			resetNowPlaying();
		};
	}, [resetNowPlaying]);

	useEffect(() => {
		// Toggle Play/Pause
		if (isPlaying && !trackRef.current.paused) trackRef.current.pause();
		else if (trackRef.current.paused) trackRef.current.play();
		setIsPlaying(!isPlaying);
	}, [props.togglePlay]);

	useEffect(() => {
		// Play New Track
		if (trackRef.current) {
			setIsPlaying(true);
			trackRef.current.play();
		}
	}, [track]);

	const playIcon = <i className="fas fa-play"></i>;
	const pauseIcon = <i className="fas fa-pause"></i>;

	// Set Play Time
	let playTime = null;
	if (currentTime && trackRef.current && !isNaN(trackRef.current.duration))
		playTime = (
			<div className="playTime">
				{formatTime(currentTime)} / {formatTime(trackRef.current.duration)}{" "}
			</div>
		);

	return (
		<div className="NowPlaying">
			<div className="nowPlayingImg">
				<img className="nowPlayingImg" src={props.track.imageUrl} alt="Album Art" />
				<div className="nowPlayingIcon">{isPlaying ? pauseIcon : playIcon}</div>
			</div>

			<div className="nowPlayingName">{props.track.name}</div>
			<div className="nowPlayingArtist">{props.track.artist}</div>
			{playTime}
			<audio ref={trackRef} src={props.track.songUrl} />
		</div>
	);
};

const mapStateToProps = state => {
	return {
		track: state.music.nowPlayingTrack,
		togglePlay: state.music.togglePlay,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		resetNowPlaying: () => dispatch(actions.resetNowPlaying()),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(NowPlaying);
