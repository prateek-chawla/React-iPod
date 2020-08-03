import React from "react";

import "./Grid.css";

const grid = props => {
	const gridStyle = {
        gridTemplateColumns: `repeat(${props.nCols},1fr)`,
        gridTemplateRows: `repeat(${props.nRows},${props.rowHeight})`,
        gap:`${props.gap}`
	};

	return (
		<div className="Grid" style={gridStyle}>
			{props.children}
		</div>
	);
};

export default grid;
