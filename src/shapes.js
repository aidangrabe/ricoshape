class Shapes {

	static circle(color, radius) {
		const graphics = new PIXI.Graphics();

		graphics.beginFill(color);
		graphics.drawCircle(radius, radius, radius);
		graphics.endFill();

		graphics.cacheAsBitmap = true;
		graphics.pivot = {
			x: radius,
			y: radius
		};

		return graphics;
	}

	static triangle(color, width, height) {
		const graphics = new PIXI.Graphics();

		graphics.beginFill(color);
		graphics.drawPolygon([
			0, height,
			width / 2, 0,	// tip
			width, height,
			0, height
		]);
		graphics.endFill();

		graphics.pivot = {
			x: width / 2,
			y: height / 3 * 2
		};
		graphics.cacheAsBitmap = true;

		return graphics;
	}

	static square(color, width, height) {
		const graphics = new PIXI.Graphics();

		graphics.beginFill(color);
		graphics.drawRect(0, 0, width, height);
		graphics.endFill();

		graphics.pivot = {
			x: width / 2,
			y: height / 2
		};
		graphics.cacheAsBitmap = true;

		return graphics;
	}

}