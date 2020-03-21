function Bullet(shadowLayer) {
	this.shadowLayer = shadowLayer;

	this.sprite = this.createBulletGraphic(0xFFFFFF, 8);
	this.shadow = this.createBulletGraphic(0x000000, 8);

	this.shadowLayer.addChild(this.shadow);	

	this.shadow.width = this.sprite.width + 2;
	this.shadow.height = this.sprite.height + 2;

	this.reset(canvas.width / 2, canvas.height / 2);
	this.velocity = {
		x: 0,
		y: 0
	};
}

Bullet.prototype.setSpeedAndDirection = function(speed, direction) {
	this.velocity.x = Math.sin(direction) * speed;
	this.velocity.y = -Math.cos(direction) * speed;
}

Bullet.prototype.update = function(delta) {
	this.sprite.position.x += this.velocity.x * delta;
	this.sprite.position.y += this.velocity.y * delta;
	this.shadow.x = this.sprite.x;
	this.shadow.y = this.sprite.y;
	this.shadow.visible = this.sprite.visible;
}

Bullet.prototype.reset = function(x, y) {
	this.sprite.position.x = x;
	this.sprite.position.y = y;
	this.shadow.position.x = x;
	this.shadow.position.y = y;
}

Bullet.prototype.hitBySquare = function(square) {
	// todo:
}

Bullet.prototype.createBulletGraphic = function(color, size) {

	var radius = size / 2;

	var graphics = new PIXI.Graphics();
	graphics.beginFill(color);
	graphics.drawCircle(radius, radius, radius);
	graphics.endFill();
	graphics.cacheAsBitmap = true;
	graphics.pivot = {
		x: radius,
		y: radius
	};

	return graphics;

}