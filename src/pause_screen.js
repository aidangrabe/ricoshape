const PauseScreen = {
	
	init: function(stage) {
		this.pauseText = new PIXI.Text("PAUSED");
		var style = Fonts.PauseText;
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