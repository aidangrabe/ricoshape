class Shield extends PowerUp {

    constructor(stage, shadowLayer) {
        super();

        this.stage = stage;
        this.shadowLayer = shadowLayer;
        this.squareSpawner = squareSpawner;

        this.numBulletsInShield = 6;

        this.bullets = [];
        this.bulletPool = [];

        // radians
        this.angle = 0;

        this.reset();
    }

    reset() {
        this.kill();
        this.bullets = [];

        for (let i = 0; i < this.numBulletsInShield; i++) {
            const bullet = this.createBullet();
            bullet.sprite.tint = player.color;
            this.bullets.push(bullet);
        }
    }

    update(delta) {
        this.angle += 1 * (delta / 16);
        const angleDelta = Math.PI * 2 / this.numBulletsInShield;

        let i = 0;

        for (let bullet of this.bullets) {
            bullet.sprite.x = player.sprite.x + Util.lengthDirX(40, this.angle + angleDelta * i);
            bullet.sprite.y = player.sprite.y + Util.lengthDirY(40, this.angle + angleDelta * i);
            bullet.update(delta);
            i++;
        }

        this.checkForCollisions();
    }

    createBullet() {
        let bullet = this.bulletPool.pop();
        if (typeof bullet === 'undefined') {
            bullet = new Bullet(this.shadowLayer);
            this.bullets.push();
            this.stage.addChild(bullet.sprite);
        }
        bullet.sprite.visible = true;
        return bullet;
    }

    checkForCollisions(gameScreen) {
        if (this.bullets.length == 0) {
            return;
        }
        squareSpawner.checkForBulletCollisions(this.bullets, (bullet) => { this.killBullet(bullet) });
    }

    killBullet(bullet) {
        console.log(bullet);
        
        bullet.sprite.visible = false;
        bullet.shadow.visible = false;
        this.bulletPool.push(bullet);
    }

    kill() {
        for (let bullet of this.bullets) {
            this.killBullet(bullet);
        }
    }

}