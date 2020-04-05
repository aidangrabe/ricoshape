class Shield extends PowerUp {

    constructor(stage, shadowLayer, player) {
        super();

        this.stage = stage;
        this.shadowLayer = shadowLayer;
        this.player = player;

        this.numBulletsInShield = 6;

        this.bullets = [];
        this.bulletPool = [];

        this.killTimer = new Timer(15 * 10, () => {
            this.kill();
        });

        this.blinkTimer = new Timer(15, () => {
            for (let bullet of this.bullets) {
                if (!bullet.active) {
                    continue;
                }
                bullet.sprite.visible = !bullet.sprite.visible;
                bullet.shadow.visible = bullet.sprite.visible;
            }

            this.blinkTimer.restart();
        });

        this.timer = new Timer(60 * 5, () => {
            this.killTimer.start();
            this.blinkTimer.start();
        });

        // radians
        this.angle = 0;

        this.reset();
    }

    reset() {
        this.kill();
        this.bullets = [];
        
        this.killTimer.stop();
        this.blinkTimer.stop();
        this.timer.restart();

        for (let i = 0; i < this.numBulletsInShield; i++) {
            const bullet = this.createBullet();
            bullet.sprite.tint = this.player.color;
            this.bullets.push(bullet);
        }
    }

    update(delta) {
        this.angle += 1 * (delta / 16);
        const angleDelta = Math.PI * 2 / this.numBulletsInShield;

        let i = 0;

        for (let bullet of this.bullets) {
            bullet.sprite.x = this.player.sprite.x + Util.lengthDirX(40, this.angle + angleDelta * i);
            bullet.sprite.y = this.player.sprite.y + Util.lengthDirY(40, this.angle + angleDelta * i);
            bullet.update(delta);
            i++;
        }

        this.checkForCollisions();

        this.killTimer.update(delta);
        this.blinkTimer.update(delta);
        this.timer.update(delta);
    }

    createBullet() {
        let bullet = this.bulletPool.pop();
        if (typeof bullet === 'undefined') {
            bullet = new Bullet(this.shadowLayer);
            this.bullets.push();
            this.stage.addChild(bullet.sprite);
        }
        bullet.active = true;
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
        bullet.sprite.visible = false;
        bullet.shadow.visible = false;
        bullet.kill();
        this.bulletPool.push(bullet);
    }

    kill() {
        this.killTimer.stop();
        this.blinkTimer.stop();
        this.timer.stop();

        for (let bullet of this.bullets) {
            this.killBullet(bullet);
        }
    }

}