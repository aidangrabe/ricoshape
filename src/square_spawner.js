function SquareSpawner() {
	this.squares = [];
	this.deadSquares = [];

	// number of squares to spawn per second
	this.spawnFrequency = 1;
}

SquareSpawner.prototype.update = function(delta) {
	for (var square of this.squares) {
		square.update(delta);
		if (square.isOffScreen(100)) {
			this.killSquare(square);
		}
	}

	var diceRoll = ~~(Math.random() * (1000 / delta));
	if (diceRoll == 1) {
		this.spawn();
	}

}

SquareSpawner.prototype.spawn = function() {

	var square;
	// resurrect square if possible
	if (this.deadSquares.length > 0) {
		square = this.deadSquares.pop();
	} else {
		square = new Square();
	}

	square.reset();
	this.squares.push(square);
	stage.addChild(square.sprite);
}

SquareSpawner.prototype.killSquare = function(square) {
	stage.removeChild(square.sprite);

	var index = this.squares.indexOf(square);
	this.squares.splice(index, 1);

	this.deadSquares.push(square);
}