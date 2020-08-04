import React, { useEffect, useState, useRef } from "react";

import BallGame from "./BallGame/BallGame";
import Countdown from "./Countdown/Countdown";

const Games = props => {
    const countdown = useRef(null);

	const [gameLoading, setGameLoading] = useState(true);

	useEffect(() => {
        if (gameLoading) {
			countdown.current = setTimeout(() => {
				setGameLoading(false);
			}, 3000);
		}

        return () => clearTimeout(countdown.current)
	}, [gameLoading]);

	return gameLoading ? (
		<Countdown seconds={3} />
	) : (
		<BallGame restartGame={setGameLoading} />
	);
};

export default Games;
