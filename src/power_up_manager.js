const TIME_TRIPLE_SHOOT = 240; // 4 seconds
const TIME_RAPID_FIRE = 360; // 6 seconds

class PowerUpManager {

	constructor(stage, player, shadowLayer) {
		this.stage = stage;
		this.player = player;
		this.shadowLayer = shadowLayer;

		this.activePowerUps = [];
		this.availablePowerUps = [
			() => { this.enableShield(); },
			() => { this.enableTripleShoot() },
			() => { this.enableRapidFire() },
			() => { this.enableExplode() }
		];
	}

	activateRandomPowerUp() {
		// pick a random power up function and execute it
		const powerUpFunction = Util.pickRandom(this.availablePowerUps);
		powerUpFunction();
	}

	update(delta) {
		for (let pup of this.activePowerUps) {
			pup.update(delta);
		}
	}

	enableShield() {
		let reused = false;

		for (let pup of this.activePowerUps) {
			if (pup instanceof Shield) {
				pup.reset();
				reused = true;
				break;
			}
		}

		if (!reused) {
			const shield = new Shield(this.stage, this.shadowLayer);
			this.activePowerUps.push(shield);
		}
	}

	checkForCollisions(gameScreen) {
		for (let pup of this.activePowerUps) {
			pup.checkForCollisions(gameScreen);
		}
	}

	killAll() {
		for (let pup of this.activePowerUps) {
			pup.kill();
		}

		this.activePowerUps = [];
	}

	enableTripleShoot() {
		this.activePowerUps.push(new TripleShoot(this));
	}

	enableRapidFire() {
		this.activePowerUps.push(new RapidFire(this));
	}

	enableExplode() {
		const player = this.player;
		const numberOfBullets = 12;
		const circle = Math.PI * 2;
		const angleDelta = circle / numberOfBullets;

		for (let i = 0; i < numberOfBullets; i++) {
			const bullet = player.createBullet();
			bullet.sprite.x = player.sprite.x;
			bullet.sprite.y = player.sprite.y;
			bullet.setSpeedAndDirection(player.bulletSpeed, angleDelta * i);
			bullet.sprite.tint = player.color;
		}
	}

	deactivatePowerUp(powerUp) {
		const pos = this.activePowerUps.indexOf(powerUp);
		if (pos != -1) {
			this.activePowerUps.splice(pos, 1);
		} else {
			console.error("Tried to remove a power up that wasn't in the active list");
		}
	}

}

// TODO re-add triple-shoot and rapid fire - Need to create a Timer class as well
// const PowerUps = {

// 	powerups: [],
// 	tripleShooterTimer: 0,
// 	rapidFireTimer: 0,

// 	update: function (delta) {
// 		if (this.tripleShooterTimer > 0) {
// 			this.tripleShooterTimer -= 1 * delta;
// 		} else {
// 			player.removeGun(Guns.TripleShooter);
// 		}

// 		if (this.rapidFireTimer > 0) {
// 			this.rapidFireTimer -= 1 * delta;
// 		} else {
// 			player.shootInterval = player.originalShootInterval;
// 		}

// 		for (let pup of this.powerups) {
// 			if (pup.active) {
// 				pup.update(delta);
// 			}
// 		}
// 	}

// }

// function tripleShooter() {
// 	PowerUps.tripleShooterTimer = TIME_TRIPLE_SHOOT;
// 	player.addGun(Guns.TripleShooter);
// }

// function rapidFire() {
// 	PowerUps.rapidFireTimer = TIME_RAPID_FIRE;
// 	player.shootInterval = player.shootInterval / 3 * 2;
// }
