function Square() {
	this.MAX_SPEED = 0.3;
	this.MIN_SPEED = 0.1;
	this.TARGET_ZONE_WIDTH = canvas.width / 2;
	this.TARGET_ZONE_HEIGHT = canvas.height / 2;

	this.sprite = this.createSquareGraphic(0x0000FF, 32, 32);
	this.velocity = {
		x: 0,
		y: 0
	};

	this.reset();

}

Square.prototype.reset = function() {

	this.sprite.visible = true;
	this.moveToStartingPoint();

	this.targetPoint = this.createRandomTargetPoint();
	this.direction = Geom.angleBetweenCoords(this.sprite.position.x, this.sprite.position.y,
		this.targetPoint.x, this.targetPoint.y) + Math.PI / 2;

	this.speed = Util.randomBetween(this.MIN_SPEED, this.MAX_SPEED);

	this.setVelocity(this.direction, this.speed);
	this.rotationSpeed = this.speed / 25;
	if (this.isMovingLeft()) {
		this.rotationSpeed *= -1;
	}
}

Square.prototype.createSquareGraphic = function(color, width, height) {
	var square = new PIXI.Graphics();
	square.beginFill(color);
	square.drawRect(0, 0, width, height);
	square.endFill();
	square.pivot = {
		x: width / 2,
		y: height / 2
	};
	square.cacheAsBitmap = true;
	return square;
}

Square.prototype.update = function(delta) {
	this.sprite.rotation += this.rotationSpeed * delta;
	this.moveTowardsTarget(delta);
}

Square.prototype.moveToStartingPoint = function() {
	// get a random value between 0-3
	var random = ~~(Math.random() * 4);

	switch (random) {
		// top
		case 0:
			this.sprite.position.y = -this.sprite.height;
			this.sprite.position.x = Math.random() * canvas.width;
			break;
		// left
		case 1:
			this.sprite.position.x = -this.sprite.width;
			this.sprite.position.y = Math.random() * canvas.height;
			break;
		// bottom
		case 2:
			this.sprite.position.x = Math.random() * canvas.width;
			this.sprite.position.y = canvas.height + this.sprite.height;
			break;
		// right
		case 3:
			this.sprite.position.x = canvas.width + this.sprite.width;
			this.sprite.position.y = Math.random() * canvas.height;
			break;
	}
}

Square.prototype.createRandomTargetPoint = function() {
	var centerX = canvas.width / 2;
	var centerY = canvas.height / 2;
	var zoneX = Math.random() * this.TARGET_ZONE_WIDTH;
	var zoneY = Math.random() * this.TARGET_ZONE_HEIGHT;
	return {
		x: centerX + (this.TARGET_ZONE_WIDTH / 2) - zoneX,
		y: centerY + (this.TARGET_ZONE_HEIGHT / 2) - zoneY
	};
}

Square.prototype.moveTowardsTarget = function(delta) {

	this.sprite.position.x += this.velocity.x * delta;
	this.sprite.position.y -= this.velocity.y * delta;

}

Square.prototype.setVelocity = function(direction, speed) {
	this.velocity.x = Math.sin(direction) * speed;
	this.velocity.y = Math.cos(direction) * speed;
}

Square.prototype.isMovingLeft = function() {
	return this.velocity.x < 0;
}

Square.prototype.isOffScreen = function(margin = 0) {
	return this.sprite.position.x > canvas.width + margin
		|| this.sprite.position.x < -margin
		|| this.sprite.position.y > canvas.height + margin
		|| this.sprite.position.y < -margin;
}