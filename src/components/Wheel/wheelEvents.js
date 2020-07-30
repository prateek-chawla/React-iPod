import ZingTouch from "zingtouch";

let currentAngle = null;
const wheelEventsHandler = event => {
	const eventAngle = Math.floor(event.detail.angle);
	if (!currentAngle) {
		currentAngle = eventAngle;
	} else {
		const angleRotated = eventAngle - currentAngle;
		if (Math.abs(angleRotated) > 12) {
			if (angleRotated < 0) {
				console.log("Forward");
			} else {
				console.log("Backward");
			}
			currentAngle = eventAngle;
		}
	}
};
const setUpWheelEvents = wheel => {
	const region = new ZingTouch.Region(wheel);
	region.bind(wheel, "rotate", wheelEventsHandler);
};

export default setUpWheelEvents;
