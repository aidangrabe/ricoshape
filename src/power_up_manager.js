const TIME_TRIPLE_SHOOT = 240; // 4 seconds
const TIME_RAPID_FIRE = 360; // 6 seconds

class PowerUpManager {

	constructor(entityManager, stage, player, shadowLayer) {
		this.entityManager = entityManager;
		this.stage = stage;
		this.player = player;
		this.shadowLayer = shadowLayer;

		this.activePowerUps = [];
		this.availablePowerUps = {
			'Shield': () => { this.enableShield(); },
			'Triple Shot': () => { this.enableTripleShoot() },
			'Rapid Fire': () => { this.enableRapidFire() },
			'Boom!': () => { this.enableExplode() },
			'Bouncy Bullets': () => { this.enableBouncyBullets() }
		};
	}

	activateRandomPowerUp() {
		// pick a random power up function and execute it
		const powerUpNames = Object.keys(this.availablePowerUps);
		const powerUpName = Util.pickRandom(powerUpNames);
		const powerUpFunction = this.availablePowerUps[powerUpName];
		
		const x = this.player.sprite.x;
		const y = this.player.sprite.y;
		this.entityManager.add(new PowerUpText(powerUpName, x, y));

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
			const shield = new Shield(this.stage, this.shadowLayer, this.player);
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

	enableBouncyBullets() {
		this.activePowerUps.push(new BouncyBullets(this));
	}

	enableExplode() {
		const player = this.player;
		const numberOfBullets = 12;
		const circle = Math.PI * 2;
		const angleDelta = circle / numberOfBullets;

		for (let i = 0; i < numberOfBullets; i++) {
			const bullet = player.createBullet();
			bullet.setPosition(player.sprite.x, player.sprite.y);
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