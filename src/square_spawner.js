function SquareSpawner() {
	this.ONE_IN_X_CHANCE_TO_DROP_POWERUP = 10;
	
	this.squares = [];

	// references any squares that have been destroyed so we can recycle them
	this.deadSquares = [];

	// number of squares to spawn per second
	this.spawnFrequency = 1;
}

SquareSpawner.prototype.update = function(delta) {

	for (let square of this.squares) {
		if (!square.sprite.visible) {
			continue;
		}

		square.update(delta);

		if (square.isOffScreen(200)) {
			this.killSquare(square);
		}
	}

	var diceRoll = ~~(Math.random() * (60 * delta));
	if (diceRoll == 1) {
		this.spawn();
	}

}

SquareSpawner.prototype.spawn = function() {
	let square;

	// resurrect square if possible
	if (this.deadSquares.length > 0) {
		square = this.deadSquares.pop();
	} else {
		square = new Square();
		stage.addChild(square.sprite);
		shadowLayer.addChild(square.shadow);
		this.squares.push(square);
	}

	square.reset();
}

SquareSpawner.prototype.killSquare = function(square) {
	if (!square.sprite.visible) {
		// square is already dead, this can happen if two bullets collide at the
		// same time with the same square
		return;
	}

	square.sprite.visible = false;
	square.shadow.visible = false;
	this.deadSquares.push(square);
	if (Util.oneIn(this.ONE_IN_X_CHANCE_TO_DROP_POWERUP)) {
		PowerUpManager.createPowerUpAt(square.sprite.x, square.sprite.y);
	}
}

SquareSpawner.prototype.explodeSquare = function(square) {
	this.killSquare(square);
	ParticleManager.burstAt(square.sprite.x, square.sprite.y, square.sprite.tint, 30);
}

SquareSpawner.prototype.checkForCollisions = function(player) {
	for (let square of this.squares) {
		if (!square.sprite.visible) {
			continue;
		}

		// only check for Player-square collisions if Player is visible
		if (player.sprite.visible) {
			if (Util.spriteCollidesWithSprite(square.sprite, player.sprite)) {
				player.hitBySquare(square);
				square.hitByPlayer(player);
				this.explodeSquare(square);
			}
		}
	}
	
	this.checkForBulletCollisions(player.bullets, player.killBullet.bind(player));
}

SquareSpawner.prototype.checkForBulletCollisions = function(bullets, killBullet) {
	for (let square of this.squares) {
		if (!square.sprite.visible) {
			continue;
		}
		for (let bullet of bullets) {
			if (!bullet.sprite.visible) {
				continue;
			}
			if (Util.spriteCollidesWithSprite(square.sprite, bullet.sprite)) {
				bullet.hitBySquare(square);
				square.hitByBullet(bullet);
				
				killBullet(bullet);
				this.explodeSquare(square);
			}
		}
	}
}