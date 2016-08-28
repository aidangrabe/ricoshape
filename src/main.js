
var canvas = document.getElementById("game-canvas");
var renderer = PIXI.autoDetectRenderer(canvas.width, canvas.height, {view: canvas, antialias: true});

var rootContainer = new PIXI.Container();
var shadowLayer = new PIXI.Container();
var stage = new PIXI.Container();
var lastFrameMillis = Date.now();

var Constants = {
	SCREEN_UNIT: canvas.width / 20
};

rootContainer.addChild(shadowLayer);
rootContainer.addChild(stage);

function gameLoop() {
	var nowMillis = Date.now();
	var delta = nowMillis - lastFrameMillis;
	lastFrameMillis = nowMillis;

	requestAnimationFrame(gameLoop);

	gameLogic(delta);
	renderer.render(rootContainer);
}

function setupInput() {
	document.addEventListener('keydown', Keyboard.onKeyDown);
	document.addEventListener('keyup', Keyboard.onKeyUp);
	document.addEventListener('mousemove', Mouse.onMouseMove);
}

setupInput();

// start the game
setup();
gameLoop();