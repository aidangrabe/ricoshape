
var canvas = document.getElementById("game-canvas");
var renderer = PIXI.autoDetectRenderer(canvas.width, canvas.height, {view: canvas, antialias: true});

var rootContainer = new PIXI.Container();
var shadowLayer = new PIXI.Container();
var particleLayer = new PIXI.Container();
var powerUpAnimationLayer = new PIXI.Container();
var hudLayer = new PIXI.Container();
var stage = new PIXI.Container();
var lastFrameMillis = Date.now();

var Constants = {
	SCREEN_UNIT: canvas.width / 20
};

rootContainer.addChild(powerUpAnimationLayer);
rootContainer.addChild(shadowLayer);
rootContainer.addChild(particleLayer);
rootContainer.addChild(stage);
rootContainer.addChild(hudLayer);

function gameLoop() {
	var nowMillis = Date.now();
	var delta = nowMillis - lastFrameMillis;
	lastFrameMillis = nowMillis;

	requestAnimationFrame(gameLoop);

	gameLogic(delta);
	renderer.render(rootContainer);
}

function load() {
	LoadingScreen.init();

	Sound.finishedLoading = loadComplete;
	Sound.load();
}

function loadComplete() {
	LoadingScreen.remove();
	setup();
	gameLoop();
}

Input.init();

load();