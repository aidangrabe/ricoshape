var PowerUpManager = {
	
	powerUps: [],
	powerUpPool: [],
	animations: [],
	animationPool: [],

	update: function(delta) {
		for (pup of this.powerUps) {
			if (pup.sprite.visible) {
				pup.update(delta);
			}
		}

		for (anim of this.animations) {
			if (anim.sprite.visible) {
				anim.update(delta);
			}
		}
	},

	createPowerUpAt: function(x, y) {
		var pup = this.createPowerUp();
		pup.sprite.x = x;
		pup.sprite.y = y;
		return pup;
	},

	createPowerUp: function() {
		var pup = this.powerUpPool.pop();
		if (pup === undefined) {
			pup = new PowerUp();
			this.powerUps.push(pup);
			stage.addChild(pup.sprite);
		}
		pup.sprite.visible = true;
		return pup;
	},

	createAnimation: function() {
		var anim = this.animationPool.pop();
		if (anim === undefined) {
			anim = new PowerUpAnimation();
			this.animations.push(anim);
			powerUpAnimationLayer.addChild(anim.sprite);
		}
		anim.sprite.visible = true;
		anim.sprite.scale.x = 1;
		anim.sprite.scale.y = 1;
		return anim;
	},

	checkForCollisions(player) {
		if (!player.sprite.visible) {
			return;
		}

		for (pup of this.powerUps) {
			if (pup.sprite.visible) {
				if (Util.spriteCollidesWithSprite(pup.sprite, player.sprite)) {
					this.powerUpHitByPlayer(pup);
				}
			}
		}
	},

	powerUpHitByPlayer: function(pup) {
		Sound.play('powerup');
		this.killPowerUp(pup);
		var anim = this.createAnimation();
		anim.sprite.x = pup.sprite.x;
		anim.sprite.y = pup.sprite.y;
	},

	killAnimation: function(anim) {
		anim.sprite.visible = false;
		this.animationPool.push(anim);
	},

	killPowerUp: function(pup) {
		pup.sprite.visible = false;
		this.powerUpPool.push(pup);
	}

}

var PowerUp = function() {
	this.sprite = PowerUp.createGraphic();
	this.rotationSpeed = 4;
	this.scaleDelta = 0;
	this.sprite.tint = Util.generateColorFrom(baseColor);
}

PowerUp.prototype.update = function(delta) {
	this.scaleDelta += (5 / delta) % Math.PI;

	var scale = 0.75 + Util.lengthDirX(0.25, this.scaleDelta);
	this.sprite.scale.x = scale;
	this.sprite.scale.y = scale;

}

PowerUp.createGraphic = function() {
	var radius = 12;

	var g = new PIXI.Graphics();
	g.beginFill(0xFFFFFF);
	g.drawCircle(radius, radius, radius);
	g.endFill();

	g.pivot.x = radius;
	g.pivot.y = radius;

	return g;
}

PowerUpAnimation = function() {
	this.sprite = PowerUp.createGraphic();
	this.sprite.tint = Util.generateColorFrom(baseColor);
}

PowerUpAnimation.prototype.update = function(delta) {
	var scale = (this.sprite.scale.x * 5 / delta);
	this.sprite.scale.x += scale;
	this.sprite.scale.y += scale;
	this.sprite.alpha -= 1 / delta;
	if (this.sprite.alpha < 0) {
		PowerUpManager.killAnimation(this);
	}
}


