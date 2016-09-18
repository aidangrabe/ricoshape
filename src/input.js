var Keyboard = {
	keyStates: {},
	keysPressedLastFrame: {},
	onKeyDown: function(event) {
		if (event.keyCode == Keys.SPACE) {
			event.preventDefault();
		}

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
	DOWN: 40,
	P: 80
};

var Input = {

	init: function() {
		document.addEventListener('keydown', Keyboard.onKeyDown);
		document.addEventListener('keyup', Keyboard.onKeyUp);
		document.addEventListener('mousemove', Mouse.onMouseMove);
		document.addEventListener('mousedown', Mouse.onMouseDown);
		document.addEventListener('mouseup', Mouse.onMouseUp);
	},

	isKeyDown: function(keyCode) {
		return Keyboard.keyStates[keyCode] == true;
	},

	isMouseButtonDown: function(mouseButtonId) {
		return Mouse.buttonStates[mouseButtonId];
	},

	isKeyPressed: function(keyCode) {
		var keyDown = Input.isKeyDown(keyCode);
		var keyWasPressed = false;
		if (keyDown && !Keyboard.keysPressedLastFrame[keyCode]) {
			keyWasPressed = true;
		}
		Keyboard.keysPressedLastFrame[keyCode] = keyDown;
		return keyWasPressed;
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
		Mouse.x = event.pageX - canvas.offsetLeft;
		Mouse.y = event.pageY - canvas.offsetTop;
	},

	onMouseDown: function(event) {
		Mouse.buttonStates[event.button] = true;
	},

	onMouseUp: function(event) {
		Mouse.buttonStates[event.button] = false;
	}

};