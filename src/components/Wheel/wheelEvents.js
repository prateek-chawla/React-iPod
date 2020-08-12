import ZingTouch from "zingtouch";

let prevAngle = null;

// Wheel Events Handler
const wheelRotateEventsHandler = (event, onMoveForward, onMoveBackward) => {
	const currentAngle = Math.floor(event.detail.angle);

	if (!prevAngle || !event.detail.distanceFromOrigin) {
		prevAngle = currentAngle;
	} else {
		const angleRotated = currentAngle - prevAngle;
		if (Math.abs(angleRotated) > 12) {
			if (angleRotated < 0) {
				// Rotated Clockwise 12deg
				onMoveForward();
			} else {
				// Rotated Counter-Clockwise 12deg
				onMoveBackward();
			}
			// Update Angle
			prevAngle = currentAngle;
		}
	}
};
export const setUpWheelRotateEvents = (wheel, onMoveForward, onMoveBackward) => {
	const region = new ZingTouch.Region(wheel);
	region.bind(wheel, "rotate", event =>
		wheelRotateEventsHandler(event, onMoveForward, onMoveBackward)
	);
};

// Click Events

export const setUpWheelClickEvents = (btnRefs, clickEvents) => {
	
	const fwdBtnRegion = new ZingTouch.Region(btnRefs.fwdBtnRef.current);
	fwdBtnRegion.bind(btnRefs.fwdBtnRef.current, "tap", event =>
		clickEvents.onFwdBtnPressed()
	);

	const bwdBtnRegion = new ZingTouch.Region(btnRefs.bwdBtnRef.current);
	bwdBtnRegion.bind(btnRefs.bwdBtnRef.current, "tap", event =>
		clickEvents.onBwdBtnPressed()
	);

	const playPauseBtnRegion = new ZingTouch.Region(btnRefs.playPauseBtnRef.current);
	playPauseBtnRegion.bind(btnRefs.playPauseBtnRef.current, "tap", event =>
		clickEvents.onPlayPauseBtnPressed()
	);

	const menuBtnRegion = new ZingTouch.Region(btnRefs.menuBtnRef.current);
	menuBtnRegion.bind(btnRefs.menuBtnRef.current, "tap", event =>
		clickEvents.onMenuBtnPressed()
	);

	const selectBtnRegion = new ZingTouch.Region(btnRefs.selectBtnRef.current);
	selectBtnRegion.bind(btnRefs.selectBtnRef.current, "tap", event =>
		clickEvents.onSelectBtnPressed()
	);
};
