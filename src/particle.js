
function Particle() {
	
	this.sprite = this.createGraphic();
	this.shadow = this.createGraphic();
	this.shadow.tint = 0x000000;

	this.startLife = 0;
	this.life = 0;
	this.alive = true;
	this.direction = 0;
	this.speed = 3;
	this.maxSpeed = 20;
	this.minSpeed = 12;
	this.scale = 1;

}

Particle.prototype.createGraphic = function() {

	var radius = 12;

	var graphics = new PIXI.Graphics();
	graphics.beginFill(0xFFFFFF);
	graphics.drawCircle(radius, radius, radius);
	graphics.endFill();

	// graphics.cacheAsBitmap = true;
	graphics.pivot.x = graphics.width / 2;
	graphics.pivot.y = graphics.height / 2;

	return graphics;

}