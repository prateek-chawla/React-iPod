import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import "./Game.css";

const Game = props => {
	const ballRef = useRef(null);
	const blockRef = useRef(null);
	const pillarRef = useRef(null);
	const checkGameInterval = useRef(null);
	const scoreRef = useRef(0);

	const [gameEnded, setGameEnded] = useState(false);

	useEffect(() => {
		scoreRef.current = 0;
		const changePillarHeight = () => {
			blockRef.current.style.top = getRandomHeight();
		};
		pillarRef.current.addEventListener("animationiteration", changePillarHeight);
		const getRandomHeight = () => {
			const random = Math.random() * 100;
			return random + 25 + "px";
		};

		checkGameInterval.current = setInterval(() => {
			const ballTopPosition = parseFloat(getComputedStyle(ballRef.current).top);
			const blockTopPosition = parseFloat(getComputedStyle(blockRef.current).top);
			const pillarLeftPosition = parseFloat(
				getComputedStyle(pillarRef.current).left
			);

			if (ballTopPosition <= 0 || ballTopPosition + 25 >= 225) {
				clearInterval(checkGameInterval.current);
				setGameEnded(true);
			}

			// Collision
			if (
				pillarLeftPosition <= 30 &&
				(ballTopPosition <= blockTopPosition ||
					ballTopPosition + 25 >= blockTopPosition + 70)
			) {
				clearInterval(checkGameInterval.current);
				setGameEnded(true);
			}

			scoreRef.current += 1;
		}, 10);

		return () => clearInterval(checkGameInterval.current);
	}, []);

	useEffect(() => {
		if (ballRef.current) {
			const ballPosition = parseFloat(getComputedStyle(ballRef.current).top);
			ballRef.current.style.top = ballPosition - 8 + "px";
		}
	}, [props.moveUp]);

	useEffect(() => {
		if (ballRef.current) {
			const ballPosition = parseFloat(getComputedStyle(ballRef.current).top);
			ballRef.current.style.top = ballPosition + 8 + "px";
		}
	}, [props.moveDown]);

	const game = (
		<div id="gameArea">
			<div id="ball" ref={ballRef} />
			<div id="pillar" ref={pillarRef}>
				<div id="block" ref={blockRef} />
			</div>
		</div>
	);

	return gameEnded ? <div>Score {Math.floor(scoreRef.current)}</div> : game;
};

const mapStateToProps = state => {
	return {
		moveUp: state.gameMoveUp,
		moveDown: state.gameMoveDown,
	};
};
export default connect(mapStateToProps)(Game);
