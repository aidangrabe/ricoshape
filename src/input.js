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
	},

	isMouseButtonDown: function(mouseButtonId) {
		return Mouse.buttonStates[mouseButtonId];
	}
};

var Mouse = {

	x: 0,
	y: 0,
	buttonStates: {},
	Buttons: {
		LEFT: 0,
		MIDDLE: 1,
		RIGHT: 2
	},

	onMouseMove: function(event) {
		Mouse.x = event.clientX - canvas.offsetLeft;
		Mouse.y = event.clientY - canvas.offsetTop;
	},

	onMouseDown: function(event) {
		Mouse.buttonStates[event.button] = true;
	},

	onMouseUp: function(event) {
		Mouse.buttonStates[event.button] = false;
	}

};