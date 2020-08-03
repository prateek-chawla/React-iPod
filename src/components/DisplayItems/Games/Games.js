import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import "./Games.css";

const Games = props => {
	const ballRef = useRef(null);
	const blockRef = useRef(null);
	const pillarRef = useRef(null);

	const [gameLoading, setGameLoading] = useState(true);
	const [gameStarted, setGameStarted] = useState(false);

	useEffect(() => {
		const changePillarHeight = () => {
			blockRef.current.style.top = getRandomHeight();
		};

		const pillar = pillarRef.current;
		pillar.addEventListener("animationiteration", changePillarHeight);

		const checkGameEnd = setInterval(() => {
			const ballTopPosition = parseFloat(getComputedStyle(ballRef.current).top);
			const blockTopPosition = parseFloat(getComputedStyle(blockRef.current).top);
			const pillarLeftPosition = parseFloat(
				getComputedStyle(pillarRef.current).left
			);

			if (ballTopPosition <= 0 || ballTopPosition + 25 >= 225) gameEnd();
			// Collision
			if (
				pillarLeftPosition <= 30 &&
				(ballTopPosition <= blockTopPosition ||
					ballTopPosition + 25 >= blockTopPosition + 70)
			) {
				gameEnd();
			}
		}, 10);

		return () => {
			clearInterval(checkGameEnd);
			pillar.removeEventListener("animationiteration", changePillarHeight);
		};
	}, []);

	useEffect(() => {
		const ballPosition = parseFloat(getComputedStyle(ballRef.current).top);
		ballRef.current.style.top = ballPosition - 8 + "px";
	}, [props.moveUp]);

	useEffect(() => {
		const ballPosition = parseFloat(getComputedStyle(ballRef.current).top);
		ballRef.current.style.top = ballPosition + 8 + "px";
	}, [props.moveDown]);

	const getRandomHeight = () => {
		const random = Math.random() * 100;
		return random + 25 + "px";
	};

	const gameEnd = () => {
		alert("Game Over");
		// clearInterval(checkGameEnd)
	};

	const game = (
		<div id="game">
			<div id="ball" ref={ballRef} />
			<div id="pillar" ref={pillarRef}>
				<div id="block" ref={blockRef} />
			</div>
		</div>
	);

    // return {gameLoading?"3":null}
    return game
};

const mapStateToProps = state => {
	return {
		moveUp: state.gameMoveUp,
		moveDown: state.gameMoveDown,
	};
};
export default connect(mapStateToProps)(Games);
