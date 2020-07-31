import ZingTouch from "zingtouch";

let prevAngle = null;

const wheelEventsHandler = event => {
    const currentAngle = Math.floor(event.detail.angle);
    
	if (!prevAngle || !event.detail.distanceFromOrigin) {
		prevAngle = currentAngle;
	} else {
		const angleRotated = currentAngle - prevAngle;
		if (Math.abs(angleRotated) > 12) {
			if (angleRotated < 0) {
				console.log("Forward");
			} else {
				console.log("Backward");
			}
			prevAngle = currentAngle;
		}
	}
};
const setUpWheelEvents = wheel => {
	const region = new ZingTouch.Region(wheel);
	region.bind(wheel, "rotate", wheelEventsHandler);
};

export default setUpWheelEvents;
