class SquareSpawner {

	constructor(stage, shadowLayer, powerUpManager, particleManager, scoreKeeper, leaveBehindText) {
		this.stage = stage;
		this.shadowLayer = shadowLayer;
		this.powerUpManager = powerUpManager;
		this.particleManager = particleManager;
		this.scoreKeeper = scoreKeeper;
		this.leaveBehindText = leaveBehindText;

		this.ONE_IN_X_CHANCE_TO_DROP_POWERUP = 10;

		this.squares = [];

		// references any squares that have been destroyed so we can recycle them
		this.deadSquares = [];

		// number of squares to spawn per second
		this.spawnFrequency = 1;
	}

	update(delta) {
		for (let square of this.squares) {
			if (!square.sprite.visible) {
				continue;
			}

			square.update(delta);

			if (square.isOffScreen(200)) {
				this.killSquare(square);
			}
		}

		const diceRoll = ~~(Math.random() * (60 * delta));
		if (diceRoll == 1) {
			this.spawn();
		}
	}

	spawn() {
		let square;

		// resurrect square if possible
		if (this.deadSquares.length > 0) {
			square = this.deadSquares.pop();
		} else {
			square = new Square(this.stage, this.scoreKeeper, this.leaveBehindText);
			this.stage.addChild(square.sprite);
			this.shadowLayer.addChild(square.shadow);
			this.squares.push(square);
		}

		square.reset();
	}

	killSquare(square) {
		if (!square.sprite.visible) {
			// square is already dead, this can happen if two bullets collide at the
			// same time with the same square
			return;
		}

		square.sprite.visible = false;
		square.shadow.visible = false;

		this.deadSquares.push(square);

		if (Util.oneIn(this.ONE_IN_X_CHANCE_TO_DROP_POWERUP)) {
			this.powerUpManager.createPowerUpAt(square.sprite.x, square.sprite.y);
		}
	}

	explodeSquare(square) {
		this.killSquare(square);
		this.particleManager.burstAt(square.sprite.x, square.sprite.y, square.sprite.tint, 30);
	}

	checkForCollisions(player) {
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

	checkForBulletCollisions(bullets, killBullet) {
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

}