var EndGameScreen = {

	insults: [
		"Awful", "Terrible", "Wow", "Srsly!?", "OMG", "You suck", "Bad", "Almost not terrible", "Measly",
		"Worthless", "Just no", "meh", "Pathetic"
	],

	init: function() {

		var insultText = new PIXI.Text(this.randomInsult());
		insultText.style = {
			font: 'bold 52px Arial',
			fill: Util.generateColorFrom(baseColor)
		};
		insultText.x = canvas.width / 2;
		insultText.y = canvas.height / 3;

		insultText.pivot.x = insultText.width / 2;
		insultText.pivot.y = insultText.height / 2;

		hudLayer.addChild(insultText);

		this.insultText = insultText;

		// should be hidden by default
		this.hide();

	},

	show: function() {
		this.insultText.rotation = this.getRandomTextRotation();
		this.insultText.visible = true;
	},

	hide: function() {
		this.insultText.visible = false;
	},

	getRandomTextRotation: function() {
		var rotationBounds = Math.PI / 16;
		return Util.randomBetween(-rotationBounds, rotationBounds);
	},

	randomInsult: function() {
		return this.insults[Math.floor(Util.randomBetween(0, this.insults.length))];
	}
	
}