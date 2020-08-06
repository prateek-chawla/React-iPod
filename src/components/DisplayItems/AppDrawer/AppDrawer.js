import React from "react";
import { connect } from "react-redux";
import Grid from "../../UI/Grid/Grid";

import "./AppDrawer.css";

const appDrawer = props => {
	return (
		<Grid nCols={2} rowHeight={"80px"} gap={"1rem"}>
			{props.menuItems.map(menuItem => {
				const styles = menuItem === props.currentMenuItem ? "active" : "inactive";
				return (
					<div className={styles} key={menuItem}>
						{menuItem}
					</div>
				);
			})}
		</Grid>
	);
};

const mapStateToProps = state => {
	return {
		menuItems: state.appDrawer.menuItems,
		currentMenuItem: state.appDrawer.currentMenuItem,
	};
};

export default connect(mapStateToProps, null)(appDrawer);
