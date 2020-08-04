import React, { useState, useEffect } from "react";
import axios from "axios";

import Spinner from "../../UI/Spinner/Spinner";
import Grid from "../../UI/Grid/Grid";

import {napsterKey} from '../../../keys'

import "./Music.css";

const Music = props => {
	const [loading, setLoading] = useState(true);
	const [tracks, setTracks] = useState([]);

	useEffect(() => {
		const fetchTracks = async () => {
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
				const albumData = await axios.get(
					albumUrl + `?apikey=${napsterKey}`
				);
				const imageUrl = albumData.data.albums[0].links.images.href;

				const imageData = await axios.get(
					imageUrl + `?apikey=${napsterKey}`
				);
				track.imageUrl = imageData.data.images[0].url;

				tracks.push(track);
			}

			setTracks(tracks);
			setLoading(false);
		};
		fetchTracks();
	}, []);

	const music = (
		<Grid nCols={3} gap={"0.5rem"} rowHeight={"85px"}>
			{tracks.map(track => (
				<div className="track" key={track.id}>
					<div className="trackName">{track.name}</div>
					<img className="trackImage" alt={track.name} src={track.imageUrl} />
				</div>
			))}
		</Grid>
	);

	return loading ? <Spinner /> : music;
};

export default Music;
