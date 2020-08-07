import React, { Children } from "react";

import "./Grid.css";

// Custom Grid Component
const grid = props => {
	const nRows = Math.floor(Children.count(props.children) / props.nCols);

	const gridStyle = {
		gridTemplateColumns: `repeat(${props.nCols},1fr)`,
		gridTemplateRows: `repeat(${nRows},${props.rowHeight})`,
		gap: `${props.gap}`,
	};

	return (
		<div className="Grid" style={gridStyle}>
			{props.children}
		</div>
	);
};

export default grid;
