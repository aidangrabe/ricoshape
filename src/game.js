// main game file

const STATE_GAME = 0;
const STATE_GAME_OVER = 1;

let player;
let squareSpawner;
let baseColor;

let gameState = STATE_GAME;
let gamePaused = false;

class GameScreen extends Screen {

	init() {
		// layers
		this.shadowLayer = new PIXI.Container();
		this.particleLayer = new PIXI.Container();
		this.powerUpAnimationLayer = new PIXI.Container();
		this.hudLayer = new PIXI.Container();

		this.stage.addChild(this.shadowLayer);
		this.stage.addChild(this.particleLayer);
		this.stage.addChild(this.powerUpAnimationLayer);
		this.stage.addChild(this.hudLayer);

		this.powerUpManager = new PowerUpManager(this.stage, this.shadowLayer);
		this.particleManager = new ParticleManager(this.particleLayer, this.shadowLayer);
		this.scoreKeeper = new ScoreKeeper();

		baseColor = Util.generateColor();

		renderer.backgroundColor = baseColor;

		player = new Player(this.stage, this.shadowLayer, this.particleManager);
		player.addToStage(this.stage, this.shadowLayer);
		player.onHitBySquare = () => {
			gameState = STATE_GAME_OVER;
			this.endGameScreen.show();
			player.kill();
			PowerUps.killAll();
		};

		squareSpawner = new SquareSpawner(
			this.stage,
			this.shadowLayer,
			this.powerUpManager,
			this.particleManager,
			this.scoreKeeper
		);

		PowerUps.init(this.stage, this.shadowLayer);
		HUD.init(this.hudLayer);
		PauseScreen.init(this.stage);
		this.endGameScreen = new EndGameScreen(this.stage, this.scoreKeeper);
		this.endGameScreen.init();
		LeaveBehindText.init(this.particleLayer);
	}

	update(delta) {
		if (Input.isKeyPressed(Keys.P)) {
			gamePaused = !gamePaused;
			PauseScreen.setPauseMode(gamePaused);
		}

		if (Input.isKeyPressed(Keys.F)) {
			Util.setFullscreen(true);
		}

		if (!gamePaused) {
			this.updateGame(delta);
		}

		HUD.update(delta);
	}

	updateGame(delta) {
		this.particleManager.update(delta);

		squareSpawner.update(delta);

		PowerUps.update(delta);
		this.powerUpManager.update(delta);

		player.update(delta);

		LeaveBehindText.update(delta);
		this.scoreKeeper.update(delta);

		PowerUps.checkForCollisions(player, squareSpawner);
		this.powerUpManager.checkForCollisions(player);
		squareSpawner.checkForCollisions(player);

		if (this.endGameScreen.container.visible) {
			this.endGameScreen.update(delta);
		}
	}

	onKeyPressed(key) {
		//EndGameScreen.onKeyPressed(key);
	}

}