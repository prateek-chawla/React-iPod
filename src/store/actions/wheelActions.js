// Action Creators for Wheel
import * as actionTypes from "./actionTypes";

export const moveForward = () => {
	return {
		type: actionTypes.MOVE_FORWARD,
	};
};

export const moveBackward = () => {
	return {
		type: actionTypes.MOVE_BACKWARD,
	};
};

export const menuBtnPressed = () => {
	return {
		type: actionTypes.MENU_PRESSED,
	};
};

export const selectBtnPressed = () => {
	return {
		type: actionTypes.SELECT_PRESSED,
	};
};

export const fwdBtnPressed = () => {
	return {
		type: actionTypes.FWD_PRESSED,
	};
};

export const bwdBtnPressed = () => {
	return {
		type: actionTypes.BWD_PRESSED,
	};
};

export const playPauseBtnPressed = () => {
	return {
		type: actionTypes.PLAY_PAUSE_PRESSED,
	};
};
