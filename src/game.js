// main game file

const STATE_GAME = 0;
const STATE_GAME_OVER = 1;

let player;
let squareSpawner;
let baseColor;

let gameState = STATE_GAME;
let gamePaused = false;

function setup() {
	baseColor = Util.generateColor();

	renderer.backgroundColor = baseColor;

	player = new Player();
	player.addToStage(stage, shadowLayer);
	player.onHitBySquare = function() {
		gameState = STATE_GAME_OVER;
		EndGameScreen.show();
		player.kill();
		PowerUps.killAll();
	};

	squareSpawner = new SquareSpawner();

	PowerUps.init();
	HUD.init();
	PauseScreen.init();
	EndGameScreen.init();

}

function gameLogic(delta) {

	if (Input.isKeyPressed(Keys.P)) {
		gamePaused = !gamePaused;
		PauseScreen.setPauseMode(gamePaused);
	}

	if (Input.isKeyPressed(Keys.F)) {
		Util.setFullscreen(true);
	}

	if (!gamePaused) {
		updateGame(delta);
	}

	HUD.update(delta);
	
}

function updateGame(delta) {

	ParticleManager.update(delta);

	squareSpawner.update(delta);

	PowerUps.update(delta);
	PowerUpManager.update(delta);

	player.update(delta);

	LeaveBehindText.update(delta);
	ScoreKeeper.update(delta);
	
	PowerUps.checkForCollisions(player, squareSpawner);
	PowerUpManager.checkForCollisions(player);
	squareSpawner.checkForCollisions(player);

}