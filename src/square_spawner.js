class SquareSpawner {

	constructor(entityManager, stage, shadowLayer, powerUpManager, particleManager, scoreKeeper, leaveBehindText, bulletGroup) {
		this.entityManager = entityManager;
		this.stage = stage;
		this.shadowLayer = shadowLayer;
		this.powerUpManager = powerUpManager;
		this.particleManager = particleManager;
		this.scoreKeeper = scoreKeeper;
		this.leaveBehindText = leaveBehindText;
		this.bulletGroup = bulletGroup;

		this.minNumSquares = 0;
		this.maxNumSquares = 5;
		this.totalNumberOfFrames = 0;

		this.ONE_IN_X_CHANCE_TO_DROP_POWERUP = 10;

		this.squares = [];

		this.squarePool = new Pool(() => {
			const square = new Square(this.shadowLayer, this.scoreKeeper, this.leaveBehindText);
			square.on('kill', (square) => { this.killSquare(square) });
			return square;
		});

		// number of squares to spawn per second
		this.spawnFrequency = 1;
	}

	update(delta) {
		this.totalNumberOfFrames += delta;

		if (this.totalNumberOfFrames > 35 * 60) {	// 35 seconds
			this.minNumSquares = 8;
			this.maxNumSquares = 30;
		} else if (this.totalNumberOfFrames > 30 * 60) {	// 30 seconds
			this.minNumSquares = 4;
			this.maxNumSquares = 15;
		} else if (this.totalNumberOfFrames > 20 * 60) {	// 20 seconds
			this.minNumSquares = 3;
			this.maxNumSquares = 12;
		} else if (this.totalNumberOfFrames > 15 * 60) {	// 15 seconds
			this.minNumSquares = 2;
			this.maxNumSquares = 10;
		} else if (this.totalNumberOfFrames > 5 * 60) {	// 5 seconds
			this.minNumSquares = 1;
			this.maxNumSquares = 7;
		}

		this.trySpawnSquare(delta);
	}

	trySpawnSquare(delta) {
		const numSquares = this.squares.length;

		if (numSquares < this.minNumSquares) {
			this.spawn();
		}

		if (numSquares > this.maxNumSquares) {
			return;
		}

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
		const index = this.squares.indexOf(square);
		if (index != -1) {
			this.squares.splice(index, 1);
			this.squarePool.recycle(square);
		} else {
			// this can happen if the same square was killed multiple times in the same frame
			throw new Error("Killed a square that was not in the active list");
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

		// TODO don't access the bullets directly
		this.checkForBulletCollisions();
	}

	checkForBulletCollisions() {
		for (let square of this.squares) {
			if (!square.active) {
				continue;
			}

			this.bulletGroup.checkForCollisionsWith(square, (bullet) => {
				bullet.kill();
				square.hitByBullet(bullet);
				this.explodeSquare(square);
			});
		}
	}

}