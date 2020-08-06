import React from "react";
import { connect } from "react-redux";
import Grid from "../../UI/Grid/Grid";

import SettingsIcon from "../../../assets/icons/Settings.png";
import GamesIcon from "../../../assets/icons/Games.png";
import WeatherIcon from "../../../assets/icons/Weather.png";
import MusicIcon from "../../../assets/icons/Music.png";

import "./AppDrawer.css";

const appDrawer = props => {
	const icons = {
		Settings: SettingsIcon,
		Games: GamesIcon,
		Weather: WeatherIcon,
		Music: MusicIcon,
	};
	return (
		<Grid nCols={2} rowHeight={"80px"} gap={"1rem"}>
			{props.menuItems.map(menuItem => {
				const styles =
					menuItem === props.currentMenuItem
						? "icon-container active"
						: "icon-container inactive";
				return (
					<div className={styles} key={menuItem}>
						<img className="appDrawerIcon" src={icons[menuItem]} alt="Settings" />
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
