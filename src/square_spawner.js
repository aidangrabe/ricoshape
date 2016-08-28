function SquareSpawner() {
	this.squares = [];

	// references any squares that have been destroyed so we can recycle them
	this.deadSquares = [new Square()];

	// number of squares to spawn per second
	this.spawnFrequency = 1;
}

SquareSpawner.prototype.update = function(delta) {
	for (var square of this.squares) {
		if (!square.sprite.visible) {
			continue;
		}

		square.update(delta);
		if (square.isOffScreen(200)) {
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
		stage.addChild(square.sprite);
		this.squares.push(square);
	}

	square.reset();
}

SquareSpawner.prototype.killSquare = function(square) {
	square.sprite.visible = false;
	this.deadSquares.push(square);
}

SquareSpawner.prototype.checkForCollisions = function(player) {

	for (square of this.squares) {
		if (!square.sprite.visible) {
			continue;
		}
		if (Util.spriteCollidesWithSprite(square.sprite, player.sprite)) {
			player.hitBySquare(square);
			square.hitByPlayer(player);
			this.killSquare(square);
		}

		var bullets = player.bullets;
		for (bullet of bullets) {
			if (!bullet.sprite.visible) {
				continue;
			}
			if (Util.spriteCollidesWithSprite(square.sprite, bullet.sprite)) {
				bullet.hitBySquare(square);
				square.hitByBullet(bullet);
				
				player.killBullet(bullet);
				this.killSquare(square);
			}
		}
	}

}