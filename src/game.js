// main game file

var player;
var squareSpawner;

function setup() {
	player = new Player();
	player.addToStage(stage, shadowLayer);

	squareSpawner = new SquareSpawner();
}

function gameLogic(delta) {

	squareSpawner.update(20);
	player.update(delta / 16 * Constants.SCREEN_UNIT / 20);
	
}