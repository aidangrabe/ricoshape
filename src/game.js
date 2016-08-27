// main game file

var player;

function setup() {
	player = new Player();
	player.addToStage(stage, shadowLayer);
}

function gameLogic(delta) {

	player.update(delta / 16 * Constants.SCREEN_UNIT / 20);
	
}