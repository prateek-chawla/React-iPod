import React from "react";

import "./Toggler.css";

// Toggle Switch

const Toggler = props => {
	return (
		<div className="switch-container">
			<input type="checkbox" name="switch" id="switch" checked={props.isOn} />
			<label className="switch-label" htmlFor="switch">
				{/* Cross on top of button */}
				<div className="toggler">
					<div className="horizontal-line lines" />
					<div className="vertical-line lines" />
				</div>
			</label>
		</div>
	);
};

export default Toggler;
