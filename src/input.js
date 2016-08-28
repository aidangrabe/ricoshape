var Keyboard = {
	keyStates: {},
	onKeyDown: function(event) {
		Keyboard.keyStates[event.keyCode] = true;
	},
	onKeyUp: function(event) {
		Keyboard.keyStates[event.keyCode] = false;
	}
};

var Keys = {
	SPACE: 32,
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40
};

var Input = {
	isKeyDown: function(keyCode) {
		return Keyboard.keyStates[keyCode] == true;
	}
};

var Mouse = {
	x: 0,
	y: 0,
	onMouseMove: function(event) {
		Mouse.x = event.clientX - canvas.offsetLeft;
		Mouse.y = event.clientY - canvas.offsetTop;
	}
};