const Keyboard = {
	keyStates: {},
	keysPressedLastFrame: {},
	onKeyDown: function (event) {
		if (event.keyCode == Keys.SPACE) {
			event.preventDefault();
		}

		Keyboard.keyStates[event.keyCode] = true;

		// onKeyPressed(event.keyCode); TODO
	},

	onKeyUp: function (event) {
		Keyboard.keyStates[event.keyCode] = false;
	}

};

const Keys = {
	ENTER: 13,
	SPACE: 32,
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,
	A: 65,
	D: 68,
	F: 70,
	S: 83,
	P: 80,
	W: 87
};

const Input = {

	init: function (renderer) {
		this.touchHandler = new TouchHandler();
		const interaction = renderer.plugins.interaction;

		// keyboard input
		document.addEventListener('keydown', Keyboard.onKeyDown);
		document.addEventListener('keyup', Keyboard.onKeyUp);

		// mouse/touch
		interaction.on('pointerdown', (event) => { this.touchHandler.onTouchDown(event) });
		interaction.on('pointermove', (event) => { this.touchHandler.onTouchMove(event) });
		interaction.on('pointerup', (event) => { this.touchHandler.onTouchUp(event) });
	},

	isPointerDown: function (index) {
		return this.touchHandler.touches[index].pressed;
	},

	isKeyDown: function (keyCode) {
		return Keyboard.keyStates[keyCode] == true;
	},

	isKeyPressed: function (keyCode) {
		const keyDown = Input.isKeyDown(keyCode);
		let keyWasPressed = false;
		if (keyDown && !Keyboard.keysPressedLastFrame[keyCode]) {
			keyWasPressed = true;
		}
		Keyboard.keysPressedLastFrame[keyCode] = keyDown;
		return keyWasPressed;
	}

};

class TouchHandler {

	constructor() {
		const maxNumTouches = 5;

		this.touches = {};

		// initialise the touches
		for (let i = 0; i < maxNumTouches; i++) {
			this.touches[i] = {
				x: -1,
				y: -1,
				pressed: false
			}
		}
	}

	onTouchDown(event) {
		event.data.originalEvent.preventDefault();
		this.updateTouches(event, true);
	}

	onTouchMove(event) {
		event.data.originalEvent.preventDefault();
		this.updateTouches(event, false);
	}

	onTouchUp(event) {
		event.data.originalEvent.preventDefault();
		const originalEvent = event.data.originalEvent;

		if (event.data.pointerType == 'mouse') {
			const index = originalEvent.button;
			this.touches[index].pressed = false;
			return;
		}

		const changedTouches = event.data.originalEvent.changedTouches;

		for (let touch of changedTouches) {
			this.touches[touch.identifier].pressed = false;
		}
	}

	updateTouches(event, pressed) {
		const originalEvent = event.data.originalEvent;

		if (event.data.pointerType == 'mouse') {
			let index = originalEvent.button;

			if (index < 0) {
				index = 0;
			}

			if (pressed) {
				this.touches[index].pressed = true;
			}

			this.updateTouchPoint(index, event.data.originalEvent.pageX, event.data.originalEvent.pageY);

			Mouse.x = this.touches[index].x;
			Mouse.y = this.touches[index].y;

			return;
		}

		const touches = event.data.originalEvent.changedTouches;

		for (let touch of touches) {
			const index = touch.identifier
			this.touches[index].pressed = true;
			this.updateTouchPoint(index, touch.pageX, touch.pageY);

			// mouse will take the latest touch point values
			Mouse.x = this.touches[index].x;
			Mouse.y = this.touches[index].y;
		}
	}

	updateTouchPoint(index, x, y) {
		this.touches[index].x = this.normalizeX(x);
		this.touches[index].y = this.normalizeY(y);
	}

	normalizeX(x) {
		const scaleFactorX = canvas.width / canvas.getBoundingClientRect().width;
		return (x - canvas.offsetLeft) * scaleFactorX;
	}

	normalizeY(y) {
		const scaleFactorY = canvas.height / canvas.getBoundingClientRect().height;
		return (y - canvas.offsetTop) * scaleFactorY;
	}

}

const Mouse = {
	x: 0,
	y: 0
};