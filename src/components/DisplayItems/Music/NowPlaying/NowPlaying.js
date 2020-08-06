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
		<div className="NowPlaying">
			<div className="nowPlayingImg">
				<img className="nowPlayingImg" src={props.track.imageUrl} alt="Album Art" />
				<div className="nowPlayingIcon">{isPlaying ? pauseIcon : playIcon}</div>
			</div>
			<div className="nowPlayingName">{props.track.name}</div>
			<div className="nowPlayingArtist">{props.track.artist}</div>
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
