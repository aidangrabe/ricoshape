class BouncyBullets extends PowerUp {

    constructor(powerUpManager) {
        super();

        this.powerUpManager = powerUpManager;
        this.player = powerUpManager.player;

        this.player.bouncyBullets = true;

        this.timer = new Timer(3 * 60, () => {
            this.player.bouncyBullets = false;
            this.kill();
        });
        this.timer.start();
    }

    update(delta) {
        this.timer.update(delta);
    }

    kill() {
        this.timer.stop();
        this.powerUpManager.deactivatePowerUp(this);
    }

}