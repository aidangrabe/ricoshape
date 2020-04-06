class Player extends Entity {

	constructor(stage, shadowLayer, particleManager, bulletGroup) {
		super();

		this.stage = stage;
		this.shadowLayer = shadowLayer;
		this.particleManager = particleManager;
		this.bulletGroup = bulletGroup;

		this.color = Util.generateColorFrom(baseColor);

		this.sprite = this.createPlayerSprite();
		this.shadow = this.createPlayerShadow();
		this.rotationSpeed = 0.1;
		this.direction = 0;
		this.acceleration = 0.3;
		this.friction = 0.98;
		this.velocity = { x: 0, y: 0 };
		this.recoilMagnitude = 0.8;
		this.originalShootInterval = 10;

		this.shootInterval = 10;
		this.shootTimer = 0;
		this.bulletSpeed = 8;
		this.bouncyBullets = false;

		this.guns = [];

		// setup key map
		this.DOWN_KEY = Keys.S;
		this.UP_KEY = Keys.W;
		this.LEFT_KEY = Keys.A;
		this.RIGHT_KEY = Keys.D;
		this.SHOOT_KEY = Keys.SPACE;

		this.smokeColors = [
			0xFFFFFF, 0xEEEEEE, 0xFEFEFE, 0xEFEFEF
		];
	}

	addToStage(_, shadowLayer) {
		this.sprite.position.x = canvas.width / 2;
		this.sprite.position.y = canvas.height / 2;

		shadowLayer.addChild(this.shadow);
	}

	createPlayerSprite() {
		const size = Constants.SCREEN_UNIT;
		return Shapes.triangle(this.color, size, size);
	}

	createPlayerShadow() {
		const size = Constants.SCREEN_UNIT + 4;
		return Shapes.triangle(0x000000, size, size);
	}

	update(delta) {
		this.handleInput(delta);

		// movement
		this.sprite.position.x += this.velocity.x;
		this.sprite.position.y += this.velocity.y;

		this.sprite.rotation = Geom.angleBetweenCoords(
			this.sprite.position.x,
			this.sprite.position.y,
			Mouse.x,
			Mouse.y
		) + Math.PI / 2;

		this.shootTimer -= delta;

		this.updateShadow(delta);
		this.keepOnScreen(delta);
		this.applyFriction(delta);

		this.streamSmoke();
	}

	handleInput(delta) {
		if (Input.isKeyDown(this.LEFT_KEY)) {
			this.addMotion(Geom.ANGLE_LEFT, this.acceleration * delta);
		}

		if (Input.isKeyDown(this.RIGHT_KEY)) {
			this.addMotion(Geom.ANGLE_RIGHT, this.acceleration * delta);
		}

		if (Input.isKeyDown(this.UP_KEY)) {
			this.addMotion(Geom.ANGLE_UP, this.acceleration * delta);
		}

		if (Input.isKeyDown(this.DOWN_KEY)) {
			this.addMotion(Geom.ANGLE_DOWN, this.acceleration * delta);
		}

		// TODO pointer index?
		if (Input.isPointerDown(0) || Input.isKeyDown(this.SHOOT_KEY)) {
			this.shoot();
		}
	}

	keepOnScreen(delta) {
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

	applyFriction(delta) {
		this.velocity.x = this.dampen(this.velocity.x, this.friction, this.acceleration);
		this.velocity.y = this.dampen(this.velocity.y, this.friction, this.acceleration);
	}

	applyVector(vector) {
		this.velocity.x += vector.x;
		this.velocity.y += vector.y;
	}

	addMotion(direction, magnitude) {
		this.velocity.x += Math.sin(direction) * magnitude;
		this.velocity.y -= Math.cos(direction) * magnitude;
	}

	shoot() {
		if (!this.sprite.visible || this.shootTimer > 0) {
			return;
		}

		// recoil in the opposite direction the player is facing
		this.addMotion(Math.PI + this.sprite.rotation, this.recoilMagnitude);

		for (let gun of this.guns) {
			gun.shoot(this);
		}

		this.shootTimer = this.shootInterval;

		const bullet = this.bulletGroup.create();

		bullet.setSpeedAndDirection(this.bulletSpeed, this.sprite.rotation);
		bullet.setPosition(this.sprite.position.x, this.sprite.position.y);
		bullet.sprite.tint = this.color;
		bullet.bouncy = this.bouncyBullets;

		Sound.play('player.shoot');
	}

	// TODO remove when other classes no longer use it
	createBullet() {
		return this.bulletGroup.create();
	}

	// diminish a value by percentage, until it is smaller than minimum.
	// then set it to 0
	dampen(value, percentage, minumum) {
		if (Math.abs(value) > minumum) {
			value *= percentage;
		} else {
			value = 0;
		}
		return value;
	}

	updateShadow(delta) {
		this.shadow.position = this.sprite.position;
		this.shadow.rotation = this.sprite.rotation;
	}

	hitBySquare(square) {
		Quake.shake(this.stage, 50, 20);
		Sound.play('player.hit');
		if (this.onHitBySquare != undefined) {
			this.onHitBySquare();
		}
	}

	kill() {
		super.kill();

		this.sprite.visible = false;
		this.shadow.visible = false;
	}

	streamSmoke() {
		// dont create any smoke when not visible
		if (!this.sprite.visible) {
			return;
		}

		const oppositeDir = Math.PI + this.sprite.rotation;
		const length = this.sprite.width / 4;

		this.particleManager.burstInDirectionAt(
			this.sprite.x + Util.lengthDirX(length, oppositeDir),
			this.sprite.y + Util.lengthDirY(length, oppositeDir),
			this.smokeColors[~~Util.randomBetween(0, this.smokeColors.length)],
			oppositeDir, // direction
			0.7,	// wiggle
			1		// amount
		);
	}

	addGun(gun) {
		const indexOfGun = this.guns.indexOf(gun);
		if (indexOfGun == -1) {
			this.guns.push(gun);
		}
	}

	removeGun(gun) {
		const indexOfGun = this.guns.indexOf(gun);
		if (indexOfGun != -1) {
			this.guns.splice(indexOfGun, 1);
		}
	}

}