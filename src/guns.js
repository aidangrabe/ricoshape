var TripleShooter = {

	shoot: function(player) {
		var angle = Math.PI / 16;

		var bullet = this.createBullet(player);
		bullet.setSpeedAndDirection(player.bulletSpeed, player.sprite.rotation - angle);

		var bullet2 = this.createBullet(player);
		bullet2.setSpeedAndDirection(player.bulletSpeed, player.sprite.rotation + angle);
	},

	createBullet: function(player) {
		var bullet = player.createBullet();
		bullet.sprite.tint = player.color;
		bullet.sprite.x = player.sprite.x;
		bullet.sprite.y = player.sprite.y;
		return bullet;
	}

}

var Guns = {

	TripleShooter: TripleShooter

}