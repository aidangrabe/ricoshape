const COMBO_TILT_THRESHOLD = Math.PI / 32;

const HUD = {

	init: function () {
		this.layer = new PIXI.Container();

		this.scoreText = new PIXI.Text("0");
		this.scoreText.style = Fonts.Score;
		this.scoreText.x = 16;
		this.scoreText.y = 16;
		this.scoreText.text = "" + this.getScore();

		this.comboText = this.createComboText();

		this.layer.addChild(this.comboText);
		this.layer.addChild(this.scoreText);

		hudLayer.addChild(this.layer);
	},

	createComboText: function () {
		const text = new PIXI.Text("0");
		text.align = 'right';
		text.style = Fonts.Score;
		text.x = canvas.width - 16;
		text.y = 16;
		return text;
	},

	update: function (delta) {
		// score
		this.scoreText.text = this.getScore();

		// combo text
		const newComboText = "x" + ScoreKeeper.comboMultiplier;
		if (newComboText != this.comboText.text) {
			this.comboText.rotation = Util.randomBetween(-COMBO_TILT_THRESHOLD, COMBO_TILT_THRESHOLD);
		}
		this.comboText.text = "x" + ScoreKeeper.comboMultiplier;
		this.comboText.pivot.x = this.comboText.width / 2;
		this.comboText.pivot.y = this.comboText.height / 2;
		this.comboText.x = canvas.width - 16 - this.comboText.width / 2;
		this.comboText.y = 16 + this.comboText.height / 2;
		this.comboText.visible = ScoreKeeper.comboMultiplier > 1;
	},

	getScore: function () {
		return ScoreKeeper.totalScore;
	}

}