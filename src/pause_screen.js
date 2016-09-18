var PauseScreen = {
	
	init: function() {
		this.pauseText = new PIXI.Text("PAUSED");
		var style = {
			font: 'bold 52px Arial',
			fill: '#FFFFFF'
		};
		this.pauseText.style = style;
		this.pauseText.x = canvas.width / 2 - this.pauseText.width / 2;
		this.pauseText.y = canvas.height / 2 - this.pauseText.height / 2;
		this.pauseText.visible = false;
		stage.addChild(this.pauseText);
	},

	setPauseMode: function(isPaused) {
		this.pauseText.visible = isPaused;
	}

}