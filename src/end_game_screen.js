const EndGameScreen = {

	playAgainFadeDuration: 0,

	insults: [
		"Awful", "Terrible", "Srsly!?", "OMG", "You suck", "Bad", "Almost not terrible", "Measly",
		"Worthless", "Just no", "meh", "Pathetic", "-_-", ":(", "Pwned!", "Cringeworthy", "Loser",
		"Crap", "#iCantEven", "#NoFilter", "Mwahahaha", "Puny Human", "Ya basic", "Yuck!",
		"Wow, really?", "You even trying?", "Sheesh..", "lol", ":facepalm:"
	],

	init: function () {
		this.container = new PIXI.Container();

		this.insultText = this.createInsultText();
		this.scoreText = this.createScoreText();
		this.playAgainText = this.createPlayAgainButton();

		this.playAgainText.interactive = true;
		this.playAgainText.on('pointerdown', (_) => this.playAgain());

		this.container.addChild(this.insultText);
		this.container.addChild(this.scoreText);
		this.container.addChild(this.playAgainText);

		hudLayer.addChild(this.container);

		// should be hidden by default
		this.hide();
	},

	show: function () {
		this.insultText.rotation = this.getRandomTextRotation();

		this.scoreText.text = this.getScore().toString();
		this.scoreText.pivot.x = this.scoreText.width / 2;
		this.scoreText.pivot.y = this.scoreText.height / 2;

		this.container.visible = true;

		this.playAgainFadeDuration = 60;
	},

	hide: function () {
		this.container.visible = false;
	},

	update: function (delta) {
		if (this.playAgainFadeDuration > 0) {
			this.playAgainFadeDuration -= delta;
		}

		//this.playAgainText.alpha = 1 / this.playAgainFadeDuration * 2;
	},

	getScore: function () {
		return ScoreKeeper.totalScore;
	},

	getRandomTextRotation: function () {
		const rotationBounds = Math.PI / 16;
		return Util.randomBetween(-rotationBounds, rotationBounds);
	},

	randomInsult: function () {
		const randomIndex = Math.floor(Util.randomBetween(0, this.insults.length));
		return this.insults[randomIndex].toUpperCase();
	},

	createInsultText: function () {
		const text = new PIXI.Text(this.randomInsult());
		text.style = Fonts.EndGameScreen;
		text.style.fill = Util.generateColorFrom(baseColor);
		text.x = canvas.width / 2;
		text.y = canvas.height / 3;

		text.pivot.x = text.width / 2;
		text.pivot.y = text.height / 2;
		return text;
	},

	createScoreText: function () {
		const text = new PIXI.Text();
		text.style = Fonts.EndGameScreen;
		text.style.fill = Util.generateColorFrom(baseColor);
		text.x = canvas.width / 2;
		text.y = canvas.height / 2;
		return text;
	},

	createPlayAgainButton: function () {
		const text = new PIXI.Text();
		text.text = "Play Again";
		text.style = Fonts.EndGameScreen;
		text.pivot.x = text.width / 2;
		text.x = canvas.width / 2;
		text.y = canvas.height / 2 + 75;
		return text;
	},

	onKeyPressed: function (key) {
		if (key == Keys.ENTER) {
			this.playAgain();
		}
	},

	playAgain: function () {
		this.hide();
		reset();
	}

}