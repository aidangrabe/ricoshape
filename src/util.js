
var Util = {

	randomBetween: function(min, max) {
		return min + Math.random() * (max - min);
	},

	spriteCollidesWithSprite: function(sprite1, sprite2) {
		return !(sprite1.position.x - sprite1.pivot.x > sprite2.position.x - sprite2.pivot.x + sprite2.width
			|| sprite1.position.x - sprite1.pivot.x + sprite1.width < sprite2.position.x - sprite2.pivot.x
			|| sprite1.position.y - sprite1.pivot.y > sprite2.position.y - sprite1.pivot.y + sprite2.height
			|| sprite1.position.y - sprite1.pivot.y + sprite1.height < sprite2.position.y - sprite1.pivot.y);
	},

	isSpriteOffScreen: function(sprite, margin = 0) {
		return sprite.position.x > canvas.width + margin
				|| sprite.position.x < -margin
				|| sprite.position.y > canvas.height + margin
				|| sprite.position.y < -margin;
	},

	generateColor: function() {
		var r, g, b;
		r = 120 + Math.random() * 60;
		g = 120 + Math.random() * 60;
		b = 120 + Math.random() * 60;
		return r << 16 | g << 8 | b;
	},

	generateColorFrom: function(baseColor) {
		var r, g, b;
		r = (baseColor & 0xFF0000) >> 16;
		g = (baseColor & 0x00FF00) >> 8;
		b = baseColor & 0x0000FF;
		r += Math.random() * 40;
		g += Math.random() * 40;
		b += Math.random() * 40;
		return r << 16 | g << 8 | b;
	}

};