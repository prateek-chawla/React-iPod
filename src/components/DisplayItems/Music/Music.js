import React from "react";
import { connect } from "react-redux";

import NowPlaying from "./NowPlaying/NowPlaying";
import MusicLibrary from "./Library/MusicLibrary";

const Music = props => {
	return props.isNowPlayingOpen ? <NowPlaying /> : <MusicLibrary />;
};

const mapStateToProps = state => {
	return { isNowPlayingOpen: state.music.isNowPlayingOpen };
};

export default connect(mapStateToProps)(Music);
