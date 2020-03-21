const COMBO_TILT_THRESHOLD = Math.PI / 32;

class HUD {

	constructor(stage, scoreKeeper) {
		this.scoreKeeper = scoreKeeper;

		this.layer = new PIXI.Container();

		this.scoreText = new PIXI.Text("0");
		this.scoreText.style = Fonts.Score;
		this.scoreText.x = 16;
		this.scoreText.y = 16;
		this.scoreText.text = "" + this.getScore();

		this.comboText = this.createComboText();

		this.layer.addChild(this.comboText);
		this.layer.addChild(this.scoreText);

		stage.addChild(this.layer);
	}

	createComboText() {
		const text = new PIXI.Text("0");
		text.align = 'right';
		text.style = Fonts.Score;
		text.x = canvas.width - 16;
		text.y = 16;
		return text;
	}


	update(delta) {
		const scoreMultiplier = this.scoreKeeper.comboMultiplier;

		// score
		this.scoreText.text = this.getScore();

		// combo text
		const newComboText = "x" + scoreMultiplier;
		if (newComboText != this.comboText.text) {
			this.comboText.rotation = Util.randomBetween(-COMBO_TILT_THRESHOLD, COMBO_TILT_THRESHOLD);
		}
		this.comboText.text = "x" + scoreMultiplier;
		this.comboText.pivot.x = this.comboText.width / 2;
		this.comboText.pivot.y = this.comboText.height / 2;
		this.comboText.x = canvas.width - 16 - this.comboText.width / 2;
		this.comboText.y = 16 + this.comboText.height / 2;
		this.comboText.visible = scoreMultiplier > 1;
	}

	getScore() {
		return this.scoreKeeper.totalScore;
	}

}