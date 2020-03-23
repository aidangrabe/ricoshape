const FIRE_SPEED_INCREASE = 0.5;  // 50% of previous interval

class RapidFire extends PowerUp {

    constructor(powerUpManager) {
        super();

        this.powerUpManager = powerUpManager;
        this.player = powerUpManager.player;

        // half the shooty time!!
        this.player.shootInterval = this.player.shootInterval * FIRE_SPEED_INCREASE;

        this.timer = new Timer(6 * 60, () => {
            // reset the shoot interval
            this.player.shootInterval = this.player.shootInterval / FIRE_SPEED_INCREASE;
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