const TIME_TRIPLE_SHOOT = 240; // 4 seconds
const TIME_RAPID_FIRE = 360; // 6 seconds

const PowerUps = {

	powerups: [],
	tripleShooterTimer: 0,
	rapidFireTimer: 0,

	init: function() {
		this.powerups.push(Shield);
	},

	update: function(delta) {

		if (this.tripleShooterTimer > 0) {
			this.tripleShooterTimer -= 1 * delta;
		} else {
			player.removeGun(Guns.TripleShooter);
		}

		if (this.rapidFireTimer > 0) {
			this.rapidFireTimer -= 1 * delta;
		} else {
			player.shootInterval = player.originalShootInterval;
		}

		for (let pup of this.powerups) {
			if (pup.active) {
				pup.update(delta);
			}
		}
	},
	
	powerUpFunctions: [
		explodePowerUp,
		enableShield,
		tripleShooter,
		rapidFire
	],

	enableRandomPowerUp: function() {
		var powerUpFunction = Util.pickRandom(this.powerUpFunctions);
		powerUpFunction();
	},

	checkForCollisions: function(player, squareSpawner) {
		for (let pup of this.powerups) {
			pup.checkForCollisions(player, squareSpawner);
		}
	},

	killAll: function() {
		for (let pup of this.powerups) {
			pup.kill();
		}	
	}

}

var Shield = {

	active: false,
	numBulletsInShield: 6,
	bullets: [],
	bulletPool: [],

	// radians
	angle: 0,

	reset: function() {
		this.kill();
		this.bullets = [];

		for (let i = 0; i < this.numBulletsInShield; i++) {
			const bullet = this.createBullet();
			bullet.sprite.tint = player.color;
			this.bullets.push(bullet);
		}

	},

	update: function(delta) {
		this.angle += 1 * (delta / 16);
		const angleDelta = Math.PI * 2 / this.numBulletsInShield;

		let i = 0;

		for (let bullet of this.bullets) {
			bullet.sprite.x = player.sprite.x + Util.lengthDirX(40, this.angle + angleDelta * i);
			bullet.sprite.y = player.sprite.y + Util.lengthDirY(40, this.angle + angleDelta * i);
			bullet.update(delta);
			i++;
		}
	},

	createBullet: function() {
		let bullet = this.bulletPool.pop();
		if (bullet === undefined) {
			bullet = new Bullet();
			this.bullets.push();
			stage.addChild(bullet.sprite);
		}
		bullet.sprite.visible = true;
		return bullet;
	},

	checkForCollisions: function(player, squareSpawner) {
		if (!this.active) {
			return;
		}
		squareSpawner.checkForBulletCollisions(this.bullets, this.killBullet.bind(this));
	},

	killBullet: function(bullet) {
		bullet.sprite.visible = false;
		bullet.sprite.visible = false;
		this.bulletPool.push(bullet);
	},

	kill: function() {
		for (let bullet of this.bullets) {
			this.killBullet(bullet);
		}
	}

}

// shoot a load of bullets out from where the player is
function explodePowerUp() {
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

function enableShield() {
	Shield.active = true;
	Shield.reset();
}

function tripleShooter() {
	PowerUps.tripleShooterTimer = TIME_TRIPLE_SHOOT;
	player.addGun(Guns.TripleShooter);
}

function rapidFire() {
	PowerUps.rapidFireTimer = TIME_RAPID_FIRE;
	player.shootInterval = player.shootInterval / 3 * 2;
}
