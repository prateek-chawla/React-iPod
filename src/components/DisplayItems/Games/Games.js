import React, { useEffect, useState } from "react";

import Game from "./Game/Game";
import Countdown from "./Countdown/Countdown";

const Games = props => {
	const [gameLoading, setGameLoading] = useState(true);
	useEffect(() => {
		setTimeout(() => {
			setGameLoading(false);
		}, 3000);
	}, []);

	return gameLoading ? <Countdown seconds={3} /> : <Game />;
};

export default Games;
