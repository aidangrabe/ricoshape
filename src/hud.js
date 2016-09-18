var HUD = {
	
	init: function() {

		this.layer = new PIXI.Container();

		this.scoreText = new PIXI.Text("0");
		this.scoreText.style = {
			font: 'bold 48px Arial',
			fill: '#FFFFFF'
		};
		this.scoreText.x = 16;
		this.scoreText.y = 16;
		this.scoreText.text = "" + score;

		this.layer.addChild(this.scoreText);

		stage.addChild(this.layer);

	},

	update: function(delta) {

		this.scoreText.text = score;

	}


}