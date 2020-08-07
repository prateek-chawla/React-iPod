import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";

import "./Wheel.css";
import setUpWheelEvents from "./wheelEvents";

import * as actions from "../../store/actions";

const Wheel = props => {
	// DOM Reference to Wheel
	const wheelRef = useRef(null);

	useEffect(() => {
		// Separate Wheel Events Handler
		setUpWheelEvents(wheelRef.current, props.onMoveForward, props.onMoveBackward);
	}, [setUpWheelEvents]);

	return (
		<div id="wheel" ref={wheelRef}>
			<div onClick={props.onMenuBtnPressed} className="wheel__item menu-btn">
				MENU
			</div>
			<div onClick={props.onFwdBtnPressed} className="wheel__item seekfwd-btn">
				<i className="fas fa-forward"></i>
			</div>
			<div onClick={props.onBwdBtnPressed} className="wheel__item seekbwd-btn">
				<i className="fas fa-backward"></i>
			</div>
			<div
				onClick={props.onPlayPauseBtnPressed}
				className="wheel__item play-pause-btn"
			>
				<i className="fas fa-play"></i>
				<i className="fas fa-pause"></i>
			</div>
			<div
				onClick={props.onSelectBtnPressed}
				className="wheel__item select-btn"
			></div>
		</div>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		onMenuBtnPressed: () => dispatch(actions.menuBtnPressed()),
		onSelectBtnPressed: () => dispatch(actions.selectBtnPressed()),
		onFwdBtnPressed: () => dispatch(actions.fwdBtnPressed()),
		onBwdBtnPressed: () => dispatch(actions.bwdBtnPressed()),
		onPlayPauseBtnPressed: () => dispatch(actions.playPauseBtnPressed()),
		onMoveForward: () => dispatch(actions.moveForward()),
		onMoveBackward: () => dispatch(actions.moveBackward()),
	};
};
export default connect(null, mapDispatchToProps)(Wheel);
