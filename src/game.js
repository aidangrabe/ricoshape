// main game file

var player;
var squareSpawner;
var baseColor;

function setup() {

	baseColor = Util.generateColor();

	renderer.backgroundColor = baseColor;

	player = new Player();
	player.addToStage(stage, shadowLayer);

	squareSpawner = new SquareSpawner();
}

function gameLogic(delta) {

	ParticleManager.update(delta);

	squareSpawner.update(20);
	player.update(delta / 16 * Constants.SCREEN_UNIT / 20);

	LeaveBehindText.update(delta);

	squareSpawner.checkForCollisions(player);
	
}