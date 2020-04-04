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
		baseColor = Util.generateColor();

		// layers
		this.shadowLayer = new PIXI.Container();
		this.particleLayer = new PIXI.Container();
		this.powerUpAnimationLayer = new PIXI.Container();
		this.hudLayer = new PIXI.Container();

		this.stage.addChild(this.shadowLayer);
		this.stage.addChild(this.particleLayer);
		this.stage.addChild(this.powerUpAnimationLayer);
		this.stage.addChild(this.hudLayer);

		this.entityManager = new EntityManager(this.stage);

		this.scoreKeeper = new ScoreKeeper();
		this.particleManager = new ParticleManager(this.particleLayer, this.shadowLayer);

		player = new Player(this.stage, this.shadowLayer, this.particleManager);
		this.powerUpManager = new PowerUpManager(this.entityManager, this.stage, player, this.shadowLayer);
		this.powerUpPickupManager = new PowerUpPickupManager(this.stage, this.powerUpAnimationLayer, this.powerUpManager);

		this.hud = new HUD(this.stage, this.scoreKeeper);
		this.leaveBehindText = new LeaveBehindText(this.particleLayer);

		renderer.backgroundColor = baseColor;

		player.addToStage(this.stage, this.shadowLayer);
		player.onHitBySquare = () => {
			gameState = STATE_GAME_OVER;
			this.endGameScreen.show();
			player.kill();
			this.powerUpManager.killAll();
		};

		squareSpawner = new SquareSpawner(
			this.entityManager,
			this.stage,
			this.shadowLayer,
			this.powerUpPickupManager,
			this.particleManager,
			this.scoreKeeper,
			this.leaveBehindText
		);

		PauseScreen.init(this.stage);
		this.endGameScreen = new EndGameScreen(this.hudLayer, this.scoreKeeper);
		this.endGameScreen.init();
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

		this.hud.update(delta);
	}

	updateGame(delta) {
		this.particleManager.update(delta);
		this.entityManager.update(delta);

		squareSpawner.update(delta);

		this.powerUpManager.update(delta);
		this.powerUpPickupManager.update(delta);

		player.update(delta);

		this.leaveBehindText.update(delta);
		this.scoreKeeper.update(delta);

		this.powerUpManager.checkForCollisions(this);
		this.powerUpPickupManager.checkForCollisions(player);
		squareSpawner.checkForCollisions(player);

		if (this.endGameScreen.container.visible) {
			this.endGameScreen.update(delta);
		}
	}

	onKeyPressed(key) {
		this.entityManager.onKeyPressed(key);
		//EndGameScreen.onKeyPressed(key);
	}

}