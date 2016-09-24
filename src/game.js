// main game file

var STATE_GAME = 0;
var STATE_GAME_OVER = 1;

var player;
var squareSpawner;
var baseColor;

var gameState = STATE_GAME;
var gamePaused = false;
var score = 0;

function setup() {

	baseColor = Util.generateColor();

	renderer.backgroundColor = baseColor;

	player = new Player();
	player.addToStage(stage, shadowLayer);
	player.onHitBySquare = function() {
		gameState = STATE_GAME_OVER;
		EndGameScreen.show();
		player.kill();
	};

	squareSpawner = new SquareSpawner();

	HUD.init();
	PauseScreen.init();
	EndGameScreen.init();

}

function gameLogic(delta) {

	if (Input.isKeyPressed(Keys.P)) {
		gamePaused = !gamePaused;
		PauseScreen.setPauseMode(gamePaused);
	}

	if (!gamePaused) {
		updateGame(delta);
	}

	HUD.update(delta);
	
}

function updateGame(delta) {

	ParticleManager.update(delta);

	squareSpawner.update(20);

	PowerUpManager.update(delta);

	player.update(delta / 16 * Constants.SCREEN_UNIT / 20);

	LeaveBehindText.update(delta);
	
	PowerUpManager.checkForCollisions(player);
	squareSpawner.checkForCollisions(player);

}