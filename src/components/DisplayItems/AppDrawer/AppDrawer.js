import React from "react";
import { connect } from "react-redux";

import "./AppDrawer.css";

const appDrawer = props => {
	return (
		<div className="AppDrawer">
			{props.menuItems.map(menuItem => {
				const styles = menuItem === props.currentMenuItem ? "active" : "inactive";
				return <div className={styles} key={menuItem}>{menuItem}</div>;
			})}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		menuItems: state.menuItems,
		currentMenuItem: state.currentMenuItem,
	};
};

export default connect(mapStateToProps, null)(appDrawer);
