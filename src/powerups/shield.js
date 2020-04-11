class Shield extends PowerUp {

    constructor(stage, shadowLayer, player, entityManager) {
        super();

        this.stage = stage;
        this.shadowLayer = shadowLayer;
        this.player = player;

        this.numBulletsInShield = 6;

        this.bulletGroup = new EntityGroup(entityManager, () => {
            return new Bullet(this.shadowLayer);
        });

        this.killTimer = new Timer(15 * 10, () => {
            this.kill();
        });

        this.blinkTimer = new Timer(15, () => {
            for (let bullet of this.bulletGroup.items) {
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

        this.killTimer.stop();
        this.blinkTimer.stop();
        this.timer.restart();

        for (let i = 0; i < this.numBulletsInShield; i++) {
            const bullet = this.bulletGroup.create();
            bullet.sprite.tint = this.player.color;
        }
    }

    update(delta) {
        this.angle += 1 * (delta / 16);
        const angleDelta = Math.PI * 2 / this.numBulletsInShield;

        let i = 0;

        for (let bullet of this.bulletGroup.items) {
            const x = this.player.sprite.x + Util.lengthDirX(40, this.angle + angleDelta * i);
            const y = this.player.sprite.y + Util.lengthDirY(40, this.angle + angleDelta * i);
            bullet.setPosition(x, y);
            i++;
        }

        this.checkForCollisions();

        this.killTimer.update(delta);
        this.blinkTimer.update(delta);
        this.timer.update(delta);
    }

    checkForCollisions() {
        squareSpawner.checkForBulletCollisions(this.bulletGroup);
    }

    kill() {
        this.killTimer.stop();
        this.blinkTimer.stop();
        this.timer.stop();

        this.bulletGroup.reset();
    }

}