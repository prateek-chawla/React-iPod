import ZingTouch from "zingtouch";

let prevAngle = null;

const wheelEventsHandler = (event, onMoveForward, onMoveBackward) => {
	const currentAngle = Math.floor(event.detail.angle);

	if (!prevAngle || !event.detail.distanceFromOrigin) {
		prevAngle = currentAngle;
	} else {
		const angleRotated = currentAngle - prevAngle;
		if (Math.abs(angleRotated) > 12) {
			if (angleRotated < 0) {
				onMoveForward();
			} else {
				onMoveBackward();
			}
			prevAngle = currentAngle;
		}
	}
};
const setUpWheelEvents = (wheel, onMoveForward, onMoveBackward) => {
	const region = new ZingTouch.Region(wheel);
	region.bind(wheel, "rotate", event =>
		wheelEventsHandler(event, onMoveForward, onMoveBackward)
	);
};

export default setUpWheelEvents;
