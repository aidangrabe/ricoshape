// main game file

var player;
var square;

function setup() {
	player = new Player();
	player.addToStage(stage, shadowLayer);

	square = new Square();
	stage.addChild(square.sprite);
}

function gameLogic(delta) {

	player.update(delta / 16 * Constants.SCREEN_UNIT / 20);
	square.update(delta);
	
}