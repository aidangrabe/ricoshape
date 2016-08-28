
var Geom = {

	ANGLE_UP: 0,
	ANGLE_RIGHT: Math.PI / 2,
	ANGLE_DOWN: Math.PI,
	ANGLE_LEFT: Math.PI / 2 * 3,

	angleBetweenCoords: function(x1, y1, x2, y2) {
		return Math.atan2((y2 - y1), x2 - x1);
	}
};