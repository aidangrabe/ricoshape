
const canvas = document.getElementById("game-canvas");

const renderer = PIXI.autoDetectRenderer({
	width: canvas.width,
	height: canvas.height,
	view: canvas,
	antialias: true
});

const Constants = {
	SCREEN_UNIT: canvas.width / 20
};

class Main {

	constructor() {
		this.stage = new PIXI.Container();

		this.gameSpeedMultiplier = 1;
		this.currentScreen = new Screen();

		this.ticker = new PIXI.Ticker();
		this.ticker.stop();
	}

	setCurrentScreen(screen) {
		screen.engine = this;
		screen.stage = new PIXI.Container();
		screen.init();
		this.stage.addChild(screen.stage);

		this.currentScreen.exit();
		this.stage.removeChild(this.currentScreen.stage);
		screen.enter();

		this.currentScreen = screen;
	}

	start() {
		this.ticker.add((delta) => {
			this.currentScreen.update(delta * this.gameSpeedMultiplier);
			renderer.render(this.stage);
		});

		this.ticker.start();
	}

}

Input.init(renderer);

const main = new Main();
main.start();

const loadingScreen = new LoadingScreen({
	onLoadComplete: function () {
		main.setCurrentScreen(new GameScreen());
	}
});

main.setCurrentScreen(loadingScreen);