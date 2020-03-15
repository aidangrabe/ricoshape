
const canvas = document.getElementById("game-canvas");
const renderer = PIXI.autoDetectRenderer({
	width: canvas.width,
	height: canvas.height,
	view: canvas,
	antialias: true
});

const rootContainer = new PIXI.Container();

// layers
const shadowLayer = new PIXI.Container();
const particleLayer = new PIXI.Container();
const powerUpAnimationLayer = new PIXI.Container();
const hudLayer = new PIXI.Container();

const stage = new PIXI.Container();

const Constants = {
	SCREEN_UNIT: canvas.width / 20
};

rootContainer.addChild(powerUpAnimationLayer);
rootContainer.addChild(shadowLayer);
rootContainer.addChild(particleLayer);
rootContainer.addChild(stage);
rootContainer.addChild(hudLayer);

class Main {

	constructor() {
		this.ticker = new PIXI.Ticker();
		this.ticker.stop();
	}

	load() {
		LoadingScreen.init();

		Sound.finishedLoading = (_) => { this.onLoadComplete() };
		Sound.load();
	}

	onLoadComplete() {
		LoadingScreen.remove();

		// global function in game.js
		setup();

		this.startGameLoop();
	}

	startGameLoop() {
		this.ticker.add((delta) => {
			// global function in game.js
			// 16 so we can maintain the backwards compatibility with old Framework
			gameLogic(delta * 16);
			renderer.render(rootContainer);
		});

		this.ticker.start();
	}

}

Input.init();

const main = new Main();
main.load();