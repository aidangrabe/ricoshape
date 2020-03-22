class PowerUpPickupManager {

	constructor(stage, powerUpLayer, powerUpManager) {
		this.stage = stage;
		this.powerUpAnimationLayer = powerUpLayer;
		this.powerUpManager = powerUpManager;

		this.powerUps = [];
		this.powerUpPool = [];
		this.animations = [];
		this.animationPool = [];
	}

	update(delta) {
		for (let pup of this.powerUps) {
			if (pup.sprite.visible) {
				pup.update(delta);
			}
		}

		for (let anim of this.animations) {
			if (anim.sprite.visible) {
				anim.update(delta);
			}
		}
	}

	createPowerUpAt(x, y) {
		const pup = this.createPowerUp();
		pup.sprite.x = x;
		pup.sprite.y = y;
		return pup;
	}

	createPowerUp() {
		let pup = this.powerUpPool.pop();
		if (typeof pup === 'undefined') {
			pup = new PowerUpPickup();
			this.powerUps.push(pup);
			this.stage.addChild(pup.sprite);
		}
		pup.sprite.visible = true;
		return pup;
	}

	createAnimation() {
		let anim = this.animationPool.pop();
		if (typeof anim === 'undefined') {
			anim = new PowerUpAnimation(this);
			this.animations.push(anim);
			this.powerUpAnimationLayer.addChild(anim.sprite);
		}
		anim.sprite.visible = true;
		anim.sprite.scale.x = 1;
		anim.sprite.scale.y = 1;
		return anim;
	}

	checkForCollisions(player) {
		if (!player.sprite.visible) {
			return;
		}

		for (let pup of this.powerUps) {
			if (pup.sprite.visible) {
				if (Util.spriteCollidesWithSprite(pup.sprite, player.sprite)) {
					this.powerUpHitByPlayer(pup);
				}
			}
		}
	}

	powerUpHitByPlayer(pup) {
		Sound.play('powerup');
		this.killPowerUp(pup);

		this.createRandomPowerUp();

		const anim = this.createAnimation();
		anim.sprite.x = pup.sprite.x;
		anim.sprite.y = pup.sprite.y;
	}

	killAnimation(anim) {
		anim.sprite.visible = false;
		this.animationPool.push(anim);
	}

	killPowerUp(pup) {
		pup.sprite.visible = false;
		this.powerUpPool.push(pup);
	}

	createRandomPowerUp() {
		this.powerUpManager.activateRandomPowerUp();
	}

}

class PowerUpPickup {

	constructor() {
		this.sprite = PowerUpPickup.createGraphic();
		this.rotationSpeed = 4;
		this.scaleDelta = 0;
		this.sprite.tint = Util.generateColorFrom(baseColor);
	}

	update(delta) {
		this.scaleDelta += (delta / 8) % Math.PI;

		const scale = 0.75 + Util.lengthDirX(0.25, this.scaleDelta);
		this.sprite.scale.x = scale;
		this.sprite.scale.y = scale;
	}

	static createGraphic() {
		const radius = 12;

		const g = new PIXI.Graphics();
		g.beginFill(0xFFFFFF);
		g.drawCircle(radius, radius, radius);
		g.endFill();

		g.pivot.x = radius;
		g.pivot.y = radius;

		return g;
	}

}

class PowerUpAnimation {

	constructor(manager) {
		this.manager = manager;
		this.sprite = PowerUpPickup.createGraphic();
		this.sprite.tint = Util.generateColorFrom(baseColor);
	}

	update(delta) {
		const scale = (this.sprite.scale.x * delta / 16);
		this.sprite.scale.x += scale;
		this.sprite.scale.y += scale;
		this.sprite.alpha -= 1 * delta / 100;
		if (this.sprite.alpha < 0) {
			this.manager.killAnimation(this);
		}
	}

}


