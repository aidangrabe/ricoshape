class TripleShoot extends PowerUp {

    constructor(powerUpManager) {
        super();

        this.powerUpManager = powerUpManager;
        this.powerUpManager.player.addGun(Guns.TripleShooter);

        this.timer = new Timer(4 * 60, () => {
            this.kill();
        }); // 4 seconds
        this.timer.start();
    }

    update(delta) {
        this.timer.update(delta);
    }

    kill() {
        const player = this.powerUpManager.player;
        player.removeGun(Guns.TripleShooter);

        this.timer.stop();
        this.powerUpManager.deactivatePowerUp(this);
    }

}