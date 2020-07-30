import React, { Component } from "react";

import "./Wheel.css";
import setUpWheelEvents from "./wheelEvents";

class Wheel extends Component {
	constructor(props) {
		super(props);
		this.wheelRef = React.createRef();
	}
	componentDidMount() {
		setUpWheelEvents(this.wheelRef.current);
	}
	render() {
		return (
			<div id="wheel" ref={this.wheelRef}>
				<div className="wheel__item menu-btn">MENU</div>
				<div className="wheel__item seekfwd-btn">
					<i className="fas fa-forward"></i>
				</div>
				<div className="wheel__item seekbwd-btn">
					<i className="fas fa-backward"></i>
				</div>
				<div className="wheel__item play-pause-btn">
					<i className="fas fa-play"></i>
					<i className="fas fa-pause"></i>
				</div>
				<div className="wheel__item centre-btn"></div>
			</div>
		);
	}
}

export default Wheel;
