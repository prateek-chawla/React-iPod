import React, { Component } from "react";
import { connect } from "react-redux";

import "./Wheel.css";
import setUpWheelEvents from "./wheelEvents";

import * as actions from "../../store/actions";

class Wheel extends Component {
	constructor(props) {
		super(props);
		// DOM Reference to Wheel
		this.wheelRef = React.createRef();
	}
	componentDidMount() {
		// Separate Wheel Events Handler
		setUpWheelEvents(
			this.wheelRef.current,
			this.props.onMoveForward,
			this.props.onMoveBackward
		);
	}
	render() {
		return (
			<div id="wheel" ref={this.wheelRef}>
				<div onClick={this.props.onMenuBtnPressed} className="wheel__item menu-btn">
					MENU
				</div>
				<div
					onClick={this.props.onFwdBtnPressed}
					className="wheel__item seekfwd-btn"
				>
					<i className="fas fa-forward"></i>
				</div>
				<div
					onClick={this.props.onBwdBtnPressed}
					className="wheel__item seekbwd-btn"
				>
					<i className="fas fa-backward"></i>
				</div>
				<div
					onClick={this.props.onPlayPauseBtnPressed}
					className="wheel__item play-pause-btn"
				>
					<i className="fas fa-play"></i>
					<i className="fas fa-pause"></i>
				</div>
				<div
					onClick={this.props.onSelectBtnPressed}
					className="wheel__item select-btn"
				></div>
			</div>
		);
	}
}

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
