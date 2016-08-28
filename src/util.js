
var Util = {

	randomBetween: function(min, max) {
		return min + Math.random() * (max - min);
	},

	spriteCollidesWithSprite: function(sprite1, sprite2) {
		return !(sprite1.position.x > sprite2.position.x + sprite2.width
			|| sprite1.position.x + sprite1.width < sprite2.position.x
			|| sprite1.position.y > sprite2.position.y + sprite2.height
			|| sprite1.position.y + sprite1.height < sprite2.position.y);
	},

	isSpriteOffScreen: function(sprite, margin = 0) {
		return sprite.position.x > canvas.width + margin
				|| sprite.position.x < -margin
				|| sprite.position.y > canvas.height + margin
				|| sprite.position.y < -margin;
	}

};