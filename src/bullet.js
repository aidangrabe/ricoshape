class Bullet extends Entity {

	constructor(shadowLayer) {
		super();

		this.shadowLayer = shadowLayer;

		const radius = 4;
		this.sprite = Shapes.circle(0xFFFFFF, radius);
		this.shadow = Shapes.circle(0x000000, radius);

		this.shadowLayer.addChild(this.shadow);

		this.shadow.width = this.sprite.width + 2;
		this.shadow.height = this.sprite.height + 2;

		this.reset(canvas.width / 2, canvas.height / 2);
		this.velocity = new PIXI.Point(0, 0);
	}

	setSpeedAndDirection(speed, direction) {
		this.velocity.x = Math.sin(direction) * speed;
		this.velocity.y = -Math.cos(direction) * speed;
	}

	update(delta) {
		const x = this.sprite.position.x + this.velocity.x * delta;
		const y = this.sprite.position.y + this.velocity.y * delta;
		this.setPosition(x, y);

		this.shadow.visible = this.sprite.visible;
	}

	reset(x, y) {
		this.setPosition(x, y);

		this.bouncy = false;
		this.bounceCount = 2;
	}

	hitBySquare(square) {
		// todo:
	}

	bounce() {
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

	setPosition(x, y) {
		this.sprite.position.x = x;
		this.sprite.position.y = y;
		this.shadow.position.x = x;
		this.shadow.position.y = y;
	}

}