// main game file

const STATE_GAME = 0;
const STATE_GAME_OVER = 1;

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
		this.bulletGroup = new EntityGroup(this.entityManager, () => {
			return new Bullet(this.shadowLayer);
		});

		this.player = new Player(this.stage, this.shadowLayer, this.particleManager, this.bulletGroup);
		this.powerUpManager = new PowerUpManager(this.entityManager, this.stage, this.player, this.shadowLayer);
		this.powerUpPickupManager = new PowerUpPickupManager(this.stage, this.powerUpAnimationLayer, this.powerUpManager);

		this.hud = new HUD(this.stage, this.scoreKeeper);
		this.leaveBehindText = new LeaveBehindText(this.particleLayer);

		renderer.backgroundColor = baseColor;

		this.entityManager.add(this.player);
		this.player.addToStage(this.stage, this.shadowLayer);
		this.player.onHitBySquare = () => {
			gameState = STATE_GAME_OVER;
			this.endGameScreen.show();
			this.player.kill();
			this.powerUpManager.killAll();
		};

		squareSpawner = new SquareSpawner(
			this.entityManager,
			this.stage,
			this.shadowLayer,
			this.powerUpPickupManager,
			this.particleManager,
			this.scoreKeeper,
			this.leaveBehindText,
			this.bulletGroup
		);

		PauseScreen.init(this.stage);
		this.endGameScreen = new EndGameScreen(this.hudLayer, this.scoreKeeper);
		this.endGameScreen.init();
	}

	update(delta) {
		if (Input.isKeyPressed(Keys.P)) {
			if (gameState != STATE_GAME_OVER) {
				gamePaused = !gamePaused;
				PauseScreen.setPauseMode(gamePaused);
			}
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

		this.leaveBehindText.update(delta);
		this.scoreKeeper.update(delta);

		this.powerUpManager.checkForCollisions(this);
		this.powerUpPickupManager.checkForCollisions(this.player);
		squareSpawner.checkForCollisions(this.player);

		if (this.endGameScreen.container.visible) {
			this.endGameScreen.update(delta);
			this.hud.hide();
		}
	}

	onKeyPressed(key) {
		this.entityManager.onKeyPressed(key);
		//EndGameScreen.onKeyPressed(key);
	}

}