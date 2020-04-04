class SquareSpawner {

	constructor(entityManager, stage, shadowLayer, powerUpManager, particleManager, scoreKeeper, leaveBehindText) {
		this.entityManager = entityManager;
		this.stage = stage;
		this.shadowLayer = shadowLayer;
		this.powerUpManager = powerUpManager;
		this.particleManager = particleManager;
		this.scoreKeeper = scoreKeeper;
		this.leaveBehindText = leaveBehindText;

		this.ONE_IN_X_CHANCE_TO_DROP_POWERUP = 10;

		this.squares = [];

		this.squarePool = new Pool(() => {
			const square = new Square(this.shadowLayer, this.scoreKeeper, this.leaveBehindText);
			square.onKilled = (square) => { this.killSquare(square) };
			return square;
		});

		// number of squares to spawn per second
		this.spawnFrequency = 1;
	}

	update(delta) {
		const diceRoll = ~~(Math.random() * (60 * delta));
		if (diceRoll == 1) {
			this.spawn();
		}
	}

	spawn() {
		const square = this.squarePool.aquire();
		square.reset();
		this.entityManager.add(square);
		this.squares.push(square);
	}

	killSquare(square) {
		this.squarePool.recycle(square);

		const index = this.squares.indexOf(square);
		if (index != -1) {
			this.squares.splice(index, 1);
		}

		if (Util.oneIn(this.ONE_IN_X_CHANCE_TO_DROP_POWERUP)) {
			this.powerUpManager.createPowerUpAt(square.sprite.x, square.sprite.y);
		}
	}

	explodeSquare(square) {
		square.kill();
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