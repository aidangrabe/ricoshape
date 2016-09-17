var LeaveBehindText = {

	ROTATION: Math.PI / 8,
	
	texts: [],
	textPool: [],

	createAt: function(x, y, color, text) {
		var newText = this.newText(text);

		style = {
			font: 'bold 52px Arial',
			fill: color
		};

		newText.x = x;
		newText.y = y;
		newText.text = text;
		newText.pivot.x = newText.width / 2;
		newText.pivot.y = newText.height / 2;
		newText.rotation = Util.randomBetween(-this.ROTATION, this.ROTATION);
		newText.alpha = 1;
		newText.style = style;
		newText.visible = true;
	},

	newText: function(displayText) {
		var text = this.textPool.pop();
		if (text === undefined) {
			text = new PIXI.Text(displayText);
			particleLayer.addChild(text);
			this.texts.push(text);
		}
		return text;
	},

	update: function(delta) {
		var dec = 0.1 / delta;

		for (text of this.texts) {
			if (text.visible) {
				if (text.alpha < 0) {
					text.visible = false;
					this.textPool.push(text);
				}
				text.alpha -= dec;
			}
		}
	}

}