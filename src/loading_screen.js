var LoadingScreen = {
	
	init: function() {
		this.screen = new PIXI.Container();

		renderer.backgroundColor = Util.generateColor();

		var loadingText = new PIXI.Text("Loading...");
		loadingText.style = {
			font: 'bold 52px Arial',
			fill: '#FFFFFF'
		};
		loadingText.x = canvas.width / 2 - loadingText.width / 2;
		loadingText.y = canvas.height / 2 - loadingText.height / 2;

		this.screen.addChild(loadingText);

		stage.addChild(this.screen);
		renderer.render(rootContainer);
	},

	remove: function() {
		stage.removeChild(this.screen);
	}

}