import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import "./BallGame.css";

const BallGame = props => {
	// DOM References
	const ballRef = useRef(null);
	const blockRef = useRef(null);
	const pillarRef = useRef(null);
	const scoreRef = useRef(0);

	const checkGameInterval = useRef(null);
	const { restartGame } = props;

	// Load Retry/Score screen if game has ended
	const [gameEnded, setGameEnded] = useState(false);

	useEffect(() => {
		// Keep track of Score
		scoreRef.current = 0;

		const changeBlockHeight = () => {
			blockRef.current.style.top = getRandomHeight();
		};

		// Change obstacle height after each animation
		pillarRef.current.addEventListener("animationiteration", changeBlockHeight);

		checkGameInterval.current = setInterval(() => {
			// Get Positions
			const ballTopPosition = parseFloat(getComputedStyle(ballRef.current).top);
			const blockTopPosition = parseFloat(getComputedStyle(blockRef.current).top);
			const pillarLeftPosition = parseFloat(
				getComputedStyle(pillarRef.current).left
			);

			if (detectCollision(ballTopPosition, pillarLeftPosition, blockTopPosition)) {
				clearInterval(checkGameInterval.current);
				setGameEnded(true);
			}
			//Increase Current Score
			scoreRef.current += 0.1;
		}, 10);

		return () => clearInterval(checkGameInterval.current);
	}, []);
	// Move Up
	useEffect(() => {
		if (ballRef.current) {
			const ballPosition = parseFloat(getComputedStyle(ballRef.current).top);
			ballRef.current.style.top = ballPosition - 8 + "px";
		}
	}, [props.moveUp]);
	// Move Down
	useEffect(() => {
		if (ballRef.current) {
			const ballPosition = parseFloat(getComputedStyle(ballRef.current).top);
			ballRef.current.style.top = ballPosition + 8 + "px";
		}
	}, [props.moveDown]);

	// Restart Game
	useEffect(() => {
		// Game Ended
		if (!ballRef.current) {
			restartGame(true);
		}
	}, [props.selectPressed, restartGame]);

	const game = (
		<div id="gameArea">
			<div id="ball" ref={ballRef} />
			<div id="pillar" ref={pillarRef}>
				<div id="block" ref={blockRef} />
			</div>
		</div>
	);

	const resultScreen = (
		<div className="gameResult">
			<div className="score">Score {Math.floor(scoreRef.current)}</div>
			Play Again?
		</div>
	);

	return gameEnded ? resultScreen : game;
};

const mapStateToProps = state => {
	return {
		moveUp: state.games.gameMoveUp,
		moveDown: state.games.gameMoveDown,
		selectPressed: state.games.gameSelectPressed,
	};
};

export default connect(mapStateToProps)(BallGame);

// Game Utility Functions
const getRandomHeight = () => {
	const random = Math.random() * 100;
	return random + 25 + "px";
};

const detectCollision = (ballTopPosition, pillarLeftPosition, blockTopPosition) => {
	// Ball height = 25px
	if (ballTopPosition <= 0 || ballTopPosition + 25 >= 225) {
		return true;
	}

	// Collision

	// Ball Position from left -> 30px
	// Block Height = 70px
	if (
		pillarLeftPosition <= 30 &&
		(ballTopPosition <= blockTopPosition ||
			ballTopPosition + 25 >= blockTopPosition + 70)
	) {
		return true;
	}

	return false;
};
