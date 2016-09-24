var EndGameScreen = {

	insults: [
		"Awful", "Terrible", "Srsly!?", "OMG", "You suck", "Bad", "Almost not terrible", "Measly",
		"Worthless", "Just no", "meh", "Pathetic", "-_-", ":(", "Pwned!", "Cringeworthy", "Loser",
		"Crap", "#iCantEven", "#NoFilter"
	],

	init: function() {

		this.insultText = this.createInsultText();
		this.scoreText = this.createScoreText();

		hudLayer.addChild(this.insultText);
		hudLayer.addChild(this.scoreText);

		// should be hidden by default
		this.hide();

	},

	show: function() {
		this.insultText.rotation = this.getRandomTextRotation();
		this.insultText.visible = true;
		this.scoreText.visible = true;

		this.scoreText.text = "Score: " + score;
		this.scoreText.pivot.x = this.scoreText.width / 2;
		this.scoreText.pivot.y = this.scoreText.height / 2;
	},

	hide: function() {
		this.insultText.visible = false;
		this.scoreText.visible = false;
	},

	getRandomTextRotation: function() {
		var rotationBounds = Math.PI / 16;
		return Util.randomBetween(-rotationBounds, rotationBounds);
	},

	randomInsult: function() {
		return this.insults[Math.floor(Util.randomBetween(0, this.insults.length))];
	},

	createInsultText: function() {
		var text = new PIXI.Text(this.randomInsult());
		text.style = {
			font: 'bold 52px Arial',
			fill: Util.generateColorFrom(baseColor)
		};
		text.x = canvas.width / 2;
		text.y = canvas.height / 3;

		text.pivot.x = text.width / 2;
		text.pivot.y = text.height / 2;
		return text;
	},

	createScoreText: function() {
		var text = new PIXI.Text();
		text.style = {
			font: 'bold 52px Arial',
			fill: Util.generateColorFrom(baseColor)
		};
		text.x = canvas.width / 2;
		text.y = canvas.height / 2;
		return text;
	}
	
}