var PowerUps = {
	
	powerUpFunctions: [
		explodePowerUp
	],

	enableRandomPowerUp: function() {
		var powerUpFunction = Util.pickRandom(this.powerUpFunctions);
		powerUpFunction();
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