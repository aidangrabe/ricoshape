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

Bullet.prototype.setSpeedAndDirection = function (speed, direction) {
	this.velocity.x = Math.sin(direction) * speed;
	this.velocity.y = -Math.cos(direction) * speed;
}

Bullet.prototype.update = function (delta) {
	const x = this.sprite.position.x + this.velocity.x * delta;
	const y = this.sprite.position.y + this.velocity.y * delta;
	this.setPosition(x, y);

	this.shadow.visible = this.sprite.visible;
}

Bullet.prototype.reset = function (x, y) {
	this.setPosition(x, y);

	this.bouncy = false;
	this.bounceCount = 2;
}

Bullet.prototype.hitBySquare = function (square) {
	// todo:
}

Bullet.prototype.createBulletGraphic = function (color, size) {
	const radius = size / 2;

	const graphics = new PIXI.Graphics();
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

Bullet.prototype.bounce = function () {
	this.bounceCount--;
	if (this.bounceCount <= 0) {
		this.bouncy = false;
	}

	const position = this.sprite.position;

	if (position.x < 0) {
		this.sprite.position.x = 0;
		this.velocity.x *= -1;
	}

	if (position.x > canvas.width) {
		this.sprite.position.x = canvas.width;
		this.velocity.x *= -1;
	}

	if (position.y < 0) {
		this.sprite.position.y = 0;
		this.velocity.y *= -1;
	}

	if (position.y > canvas.height) {
		this.sprite.position.y = canvas.height;
		this.velocity.y *= -1;
	}
}

Bullet.prototype.setPosition = function (x, y) {
	this.sprite.position.x = x;
	this.sprite.position.y = y;
	this.shadow.position.x = x;
	this.shadow.position.y = y;
}