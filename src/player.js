var Player = function() {
	this.sprite = this.createPlayerSprite();
	this.shadow = this.createPlayerShadow();
	this.rotationSpeed = 0.1;
	this.direction = 0;
	this.acceleration = 0.2;
	this.friction = 0.98;
	this.velocity = {x: 0, y: 0};
	this.recoilMagnitude = 0.8;
}

Player.prototype.addToStage = function(stage, shadowLayer) {
	stage.addChild(this.sprite);
	this.sprite.position.x = canvas.width / 2;
	this.sprite.position.y = canvas.height / 2;

	shadowLayer.addChild(this.shadow);
}

Player.prototype.createPlayerSprite = function() {
	var size = Constants.SCREEN_UNIT;
	return this.createTriangleGraphic(0xFF0000, size, size);
}

Player.prototype.createPlayerShadow = function() {
	var size = Constants.SCREEN_UNIT + 4;
	return this.createTriangleGraphic(0xFFFFFF, size, size);
}

Player.prototype.turnLeft = function() {
	this.sprite.rotation -= this.rotationSpeed;
	this.direction -= this.rotationSpeed;
}

Player.prototype.turnRight = function() {
	this.sprite.rotation += this.rotationSpeed;
	this.direction += this.rotationSpeed;
}

Player.prototype.update = function(delta) {

	if (Input.isKeyDown(Keys.LEFT)) {
		this.turnLeft();
	}

	if (Input.isKeyDown(Keys.RIGHT)) {
		this.turnRight();
	}

	if (Input.isKeyDown(Keys.UP)) {
		this.addMotion(this.direction, this.acceleration * delta);
	}

	if (Input.isKeyDown(Keys.SPACE)) {
		this.shoot();
	}

	// movement
	this.sprite.position.x += this.velocity.x;
	this.sprite.position.y += this.velocity.y;

	this.updateShadow(delta);
	this.keepOnScreen(delta);
	this.applyFriction(delta);

}

Player.prototype.keepOnScreen = function(delta) {
	if (this.sprite.x < -this.sprite.pivot.x) {
		this.sprite.x = canvas.width + this.sprite.pivot.x;
	}
	if (this.sprite.y < -this.sprite.pivot.y) {
		this.sprite.y = canvas.height + this.sprite.pivot.y;
	}
	if (this.sprite.x > canvas.width + this.sprite.pivot.x) {
		this.sprite.x = -this.sprite.pivot.x;
	}
	if (this.sprite.y > canvas.height + this.sprite.pivot.y) {
		this.sprite.y = -this.sprite.pivot.y;
	}
}

Player.prototype.applyFriction = function(delta) {

	this.velocity.x = this.dampen(this.velocity.x, this.friction, this.acceleration);
	this.velocity.y = this.dampen(this.velocity.y, this.friction, this.acceleration);

}

Player.prototype.applyVector = function(vector) {
	this.velocity.x += vector.x;
	this.velocity.y += vector.y;
}

Player.prototype.addMotion = function(direction, magnitude) {
	this.velocity.x += Math.sin(direction) * magnitude;
	this.velocity.y -= Math.cos(direction) * magnitude;
}

Player.prototype.shoot = function() {
	// recoil
	this.addMotion(Math.PI + this.direction, this.recoilMagnitude);
}

// diminish a value by percentage, until it is smaller than minimum.
// then set it to 0
Player.prototype.dampen = function(value, percentage, minumum) {
	if (Math.abs(value) > minumum) {
		value *= percentage;
	} else {
		value = 0;
	}
	return value;
}

Player.prototype.updateShadow = function(delta) {
	this.shadow.position = this.sprite.position;
	this.shadow.rotation = this.sprite.rotation;
}

Player.prototype.createTriangleGraphic = function(color, width, height) {
	var sprite = new PIXI.Graphics();

	sprite.beginFill(color);
	sprite.drawPolygon([
		0, height,
		width / 2, 0,	// tip
		width, height,
		0, height
		]);
	sprite.endFill();
	sprite.pivot = {
		x: width / 2, 
		y: height / 3 * 2
	};
	sprite.cacheAsBitmap = true;

	return sprite;
}
