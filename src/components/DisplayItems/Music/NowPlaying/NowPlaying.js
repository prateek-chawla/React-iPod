import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import * as actions from "../../../../store/actions";

import "./NowPlaying.css";

const NowPlaying = props => {
	const trackRef = useRef(null);

	const [isPlaying, setIsPlaying] = useState(false);

	useEffect(() => {
		return () => {
			props.resetNowPlaying();
		};
	}, []);

	useEffect(() => {
		if (isPlaying && !trackRef.current.paused) trackRef.current.pause();
		else if (trackRef.current.paused) trackRef.current.play();
		setIsPlaying(!isPlaying);
	}, [props.togglePlay]);

	useEffect(() => {
		if (trackRef.current) {
			setIsPlaying(true);
			trackRef.current.play();
		}
	}, [props.track]);

	const playIcon = <i className="fas fa-play"></i>;
	const pauseIcon = <i className="fas fa-pause"></i>;
	return (
		<>
			<img src={props.track.imageUrl} alt="Album Art" />
			<div>{props.track.name}</div>
			<div>{props.track.artist}</div>
			<audio ref={trackRef} src={props.track.songUrl} />
			{isPlaying ? pauseIcon : playIcon}
		</>
	);
};

const mapStateToProps = state => {
	return {
		track: state.nowPlayingTrack,
		togglePlay: state.togglePlay,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		resetNowPlaying: () => dispatch(actions.resetNowPlaying()),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(NowPlaying);
