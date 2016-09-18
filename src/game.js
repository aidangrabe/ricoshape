// main game file

var player;
var squareSpawner;
var baseColor;

var gamePaused = false;
var score = 0;

function setup() {

	baseColor = Util.generateColor();

	renderer.backgroundColor = baseColor;

	player = new Player();
	player.addToStage(stage, shadowLayer);

	squareSpawner = new SquareSpawner();

	HUD.init();
	PauseScreen.init();

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
	player.update(delta / 16 * Constants.SCREEN_UNIT / 20);

	LeaveBehindText.update(delta);

	squareSpawner.checkForCollisions(player);

}