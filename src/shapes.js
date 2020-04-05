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

}