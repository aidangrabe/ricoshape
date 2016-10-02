
var Util = {

	oneIn: function(n) {
		return ~~(Math.random() * n) == 0
	},

	randomBetween: function(min, max) {
		return min + Math.random() * (max - min);
	},

	spriteCollidesWithSprite: function(s1, s2) {

		var x1 = s1.position.x;
		var x2 = s2.position.x;
		var y1 = s1.position.y;
		var y2 = s2.position.y;

		var xdist = x1 - x2;

		var combinedCenterX = (s1.width + s2.width) / 2;
		var combinedCenterY = (s1.height + s2.height) / 2;

		if (xdist > -combinedCenterX && xdist < combinedCenterX) {
			var ydist = y1 - y2;
			if (ydist > -combinedCenterY && ydist < combinedCenterY) {
				return true;
			}
		}

		return false;

	},

	isSpriteOffScreen: function(sprite, margin) {
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
	},

	// pick a random element in the given array
	pickRandom: function(haystack) {
		return haystack[Math.floor(Math.random() * haystack.length)];
	},

	lengthDirX: function(length, dir) {
		return Math.sin(dir) * length;
	},

	lengthDirY: function(length, dir) {
		return -Math.cos(dir) * length;
	},

	setFullscreen: function(fullscreen) {
		if (fullscreen) {
			canvas.style.width = "100%";
			canvas.style.height = "100%";
		} else {
			canvas.style.width = canvas.width + "px";
			canvas.style.height = canvas.height + "px";
		}
	}

};