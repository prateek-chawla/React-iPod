import React from "react";

import "./Error.css";

// Error Screen
const Error = props => {
	return (
		<div className="Error">
			<i className="errorIcon fas fa-exclamation-triangle"></i>
			{props.error || "An Error Occured"}
		</div>
	);
};

export default Error;
