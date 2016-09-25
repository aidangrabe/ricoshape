
var PowerUps = {

	powerups: [],
	tripleShooterTimer: 0,

	init: function() {
		this.powerups.push(Shield);
	},

	update: function(delta) {

		if (this.tripleShooterTimer > 0) {
			this.tripleShooterTimer -= 1 / delta;
		} else {
			player.removeGun(Guns.TripleShooter);
		}

		for (pup of this.powerups) {
			if (pup.active) {
				pup.update(delta);
			}
		}
	},
	
	powerUpFunctions: [
		explodePowerUp,
		enableShield,
		tripleShooter
	],

	enableRandomPowerUp: function() {
		var powerUpFunction = Util.pickRandom(this.powerUpFunctions);
		powerUpFunction();
	},

	checkForCollisions: function(player, squareSpawner) {
		for (pup of this.powerups) {
			pup.checkForCollisions(player, squareSpawner);
		}
	},

	killAll: function() {
		for (pup of this.powerups) {
			pup.kill();
		}	
	}

}

var Shield = {

	active: false,
	numBulletsInShield: 6,
	bullets: [],
	bulletPool: [],
	angle: 0,

	reset: function() {
		this.kill();
		this.bullets = [];

		for (i = 0; i < this.numBulletsInShield; i++) {
			var bullet = this.createBullet();
			bullet.sprite.tint = player.color;
			this.bullets.push(bullet);
		}

	},

	update: function(delta) {
		this.angle += 1 / delta;
		var angleDelta = Math.PI * 2 / this.numBulletsInShield;
		i = 0;
		for (bullet of this.bullets) {
			bullet.sprite.x = player.sprite.x + Util.lengthDirX(40, this.angle + angleDelta * i);
			bullet.sprite.y = player.sprite.y + Util.lengthDirY(40, this.angle + angleDelta * i);
			i++;
		}
	},

	createBullet: function() {
		var bullet = this.bulletPool.pop();
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
		this.bulletPool.push(bullet);
	},

	kill: function() {
		for (bullet of this.bullets) {
			this.killBullet(bullet);
		}
	}

}

// shoot a load of bullets out from where the player is
function explodePowerUp() {
	var numberOfBullets = 12;
	var circle = Math.PI * 2;
	var angleDelta = circle / numberOfBullets;

	for (i = 0; i < numberOfBullets; i++) {
		var bullet = player.createBullet();
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
	PowerUps.tripleShooterTimer = 30;
	player.addGun(Guns.TripleShooter);
}
