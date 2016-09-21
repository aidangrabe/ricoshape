var EndGameScreen = {

	insults: [
		"Awful", "Terrible", "Wow", "Srsly!?", "OMG", "You suck", "Bad", "Almost not terrible", "Measly",
		"Worthless", "Just no", "meh"
	],

	init: function() {

		var insultText = new PIXI.Text(Util.pickRandom(this.insults).toUpperCase());
		insultText.style = {
			font: 'bold 52px Arial',
			fill: Util.generateColorFrom(baseColor)
		};
		insultText.x = canvas.width / 2 - insultText.width / 2;
		insultText.y = canvas.height / 2 - insultText.height / 2;
		insultText.rotation = this.ROTATION;

		stage.addChild(insultText);

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
		return -Math.PI / 16 + Math.random(Math.PI / 8);
	}
	
}