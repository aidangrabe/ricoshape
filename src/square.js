class Square extends Entity {

	constructor(shadowLayer, scoreKeeper, leaveBehindText) {
		super();

		this.stage = null;
		this.shadowLayer = shadowLayer;
		this.scoreKeeper = scoreKeeper;
		this.leaveBehindText = leaveBehindText;

		this.MAX_SPEED = 5;
		this.MIN_SPEED = 2;
		this.MAX_SIZE = 2.5;
		this.MIN_SIZE = 1;

		this.TARGET_ZONE_WIDTH = canvas.width / 2;
		this.TARGET_ZONE_HEIGHT = canvas.height / 2;

		this.score = 0;
		this.sprite = Shapes.square(0xFFFFFF, 32, 32);
		this.shadow = Shapes.square(0x000000, 32, 32);
		this.shadow.visible = false;
		this.size = 1;
		this.velocity = {
			x: 0,
			y: 0
		};
	}

	onAddedToStage(stage) {
		this.stage = stage;
		this.shadowLayer.addChild(this.shadow);
	}

	onRemovedFromStage(_stage) {
		this.stage = null;
		this.shadowLayer.removeChild(this.shadow);
	}

	reset() {
		this.active = true;
		this.sprite.visible = true;
		this.moveToStartingPoint();

		this.targetPoint = this.createRandomTargetPoint();
		this.direction = Geom.angleBetweenCoords(this.sprite.position.x, this.sprite.position.y,
			this.targetPoint.x, this.targetPoint.y) + Math.PI / 2;
		this.sprite.tint = Util.generateColorFrom(baseColor);

		this.size = Util.randomBetween(this.MIN_SIZE, this.MAX_SIZE);
		this.sprite.tint = Util.generateColorFrom(baseColor);
		this.sprite.scale = {
			x: this.size,
			y: this.size
		};
		this.speed = Util.randomBetween(this.MIN_SPEED, this.MAX_SPEED);

		this.setVelocity(this.direction, this.speed);
		this.rotationSpeed = this.speed / 25 / this.size;

		this.calculateScore();

		this.shadow.x = this.sprite.x;
		this.shadow.y = this.sprite.y;
		this.shadow.width = this.sprite.width + 2;
		this.shadow.height = this.sprite.height + 2;
		this.shadow.visible = true;

		if (Util.oneIn(2)) {
			this.rotationSpeed *= -1;
		}

		this.on('kill', () => {
			this.sprite.visible = false;
			this.shadow.visible = false;
		});
	}

	update(delta) {
		this.sprite.rotation += this.rotationSpeed * delta;
		this.moveTowardsTarget(delta);

		this.shadow.rotation = this.sprite.rotation;
		this.shadow.x = this.sprite.x;
		this.shadow.y = this.sprite.y;

		if (this.isOffScreen(200)) {
			this.kill();
		}
	}

	moveToStartingPoint() {
		// get a random value between 0-3
		const random = ~~(Math.random() * 4);

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

	createRandomTargetPoint() {
		const centerX = canvas.width / 2;
		const centerY = canvas.height / 2;
		const zoneX = Math.random() * this.TARGET_ZONE_WIDTH;
		const zoneY = Math.random() * this.TARGET_ZONE_HEIGHT;
		return {
			x: centerX + (this.TARGET_ZONE_WIDTH / 2) - zoneX,
			y: centerY + (this.TARGET_ZONE_HEIGHT / 2) - zoneY
		};
	}

	moveTowardsTarget(delta) {
		this.sprite.position.x += this.velocity.x * delta;
		this.sprite.position.y -= this.velocity.y * delta;

	}

	setVelocity(direction, speed) {
		this.velocity.x = Math.sin(direction) * speed;
		this.velocity.y = Math.cos(direction) * speed;
	}

	isMovingLeft() {
		return this.velocity.x < 0;
	}

	isOffScreen(margin) {
		return this.sprite.position.x > canvas.width + margin
			|| this.sprite.position.x < -margin
			|| this.sprite.position.y > canvas.height + margin
			|| this.sprite.position.y < -margin;
	}

	hitByBullet(_bullet) {
		const scoreEarned = this.scoreKeeper.squareKill(this);

		Quake.shake(this.stage, 10, 10);
		Sound.play('square.hit');

		this.leaveBehindText.createAt(this.sprite.x, this.sprite.y, this.sprite.tint, scoreEarned);
	}

	calculateScore() {
		this.score = (this.MAX_SIZE + this.MIN_SIZE - this.size) * this.speed;
		this.score = ~~this.score;
	}

	hitByPlayer() {
	}

}