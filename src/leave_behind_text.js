const LeaveBehindText = {

	ROTATION: Math.PI / 8,
	
	texts: [],
	textPool: [],

	createAt: function(x, y, color, text) {
		const newText = this.newText(text);

		newText.x = x;
		newText.y = y;
		newText.text = text;
		newText.pivot.x = newText.width / 2;
		newText.pivot.y = newText.height / 2;
		newText.rotation = Util.randomBetween(-this.ROTATION, this.ROTATION);
		newText.alpha = 1;
		newText.style = Fonts.LeaveBehindText;
		newText.style.fill = color;
		newText.visible = true;
	},

	newText: function(displayText) {
		let text = this.textPool.pop();

		if (typeof text === 'undefined') {
			text = new PIXI.Text(displayText);
			particleLayer.addChild(text);
			this.texts.push(text);
		}

		return text;
	},

	update: function(delta) {
		const dec = delta / 150;

		for (let text of this.texts) {
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