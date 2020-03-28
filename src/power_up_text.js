/**
 * A class that shows some text as its sprite.
 * The text is centered on the given x and y coordinates.
 */
class PowerUpText extends Entity {

    constructor(name, x, y) {
        super();

        this.LIFE = 100;

        this.name = name;
        this.position = new PIXI.Point(x, y);
        this.life = this.LIFE;

        this.sprite = this.createSprite();
    }

    update(delta) {
        this.life -= delta;

        if (this.life <= 0) {
            this.kill();
            return;
        }

        // flash the text in and out using a quick sin wave
        const lifeFraction = this.life / this.LIFE;
        const lifePie = lifeFraction * 2 * Math.PI;
        const alpha = Math.sin(lifePie * 6);

        this.sprite.alpha = alpha;
    }

    createSprite() {
        const text = new PIXI.Text();
        text.style = Fonts.LeaveBehindText;
        text.text = this.name;
        text.alpha = 0;

        text.position.x = this.position.x - text.width / 2;
        text.position.y = this.position.y - text.height / 2;

        return text;
    }

}