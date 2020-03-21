class LoadingScreen extends Screen {

	constructor(callbacks) {
		super();
		this.callbacks = callbacks;
	}

	init() {
		renderer.backgroundColor = Util.generateColor();

		const loadingText = new PIXI.Text("Loading...");
		loadingText.style = Fonts.Loading;
		loadingText.x = canvas.width / 2 - loadingText.width / 2;
		loadingText.y = canvas.height / 2 - loadingText.height / 2;

		this.stage.addChild(loadingText);
	}

	enter() {
		this.load();
	}

	load() {
		Sound.finishedLoading = (_) => { this.onLoadComplete() };
		Sound.load();
	}

	onLoadComplete() {
		this.callbacks.onLoadComplete();
	}

}