import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";

import "./Wheel.css";
import { setUpWheelRotateEvents, setUpWheelClickEvents } from "./wheelEvents";

import * as actions from "../../store/actions";

const Wheel = props => {
	// DOM Reference to Wheel
	const wheelRef = useRef(null);

	const btnRefs = {
		fwdBtnRef: useRef(null),
		bwdBtnRef: useRef(null),
		playPauseBtnRef: useRef(null),
		selectBtnRef: useRef(null),
		menuBtnRef: useRef(null),
	};

	const { onMoveForward, onMoveBackward, ...clickEvents } = props;

	useEffect(() => {
		// Separate Wheel Events Handler
		setUpWheelRotateEvents(wheelRef.current, onMoveForward, onMoveBackward);
		setUpWheelClickEvents(btnRefs, clickEvents);

		//eslint-disable-next-line
	}, [btnRefs]);

	return (
		<div id="wheel" ref={wheelRef}>
			<div ref={btnRefs.menuBtnRef} className="wheel__item menu-btn">
				MENU
			</div>
			<div ref={btnRefs.fwdBtnRef} className="wheel__item seekfwd-btn">
				<i className="fas fa-forward"></i>
			</div>
			<div ref={btnRefs.bwdBtnRef} className="wheel__item seekbwd-btn">
				<i className="fas fa-backward"></i>
			</div>
			<div ref={btnRefs.playPauseBtnRef} className="wheel__item play-pause-btn">
				<i className="fas fa-play"></i>
				<i className="fas fa-pause"></i>
			</div>
			<div ref={btnRefs.selectBtnRef} className="wheel__item select-btn"></div>
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
