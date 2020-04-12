const TIME_FOR_EACH_COMBO = 1 * 60; // seconds

class ScoreKeeper {

    constructor() {
        this.totalScore = 0;
        this.comboMultiplier = 1;
        this.comboTimer = TIME_FOR_EACH_COMBO;
    }

    update(delta) {
        if (this.comboMultiplier > 1) {
            this.comboTimer -= delta;

            if (this.comboTimer <= 0) {
                this.comboMultiplier = 1;

                this.resetComboTimer();
            }
        } else {
            this.resetComboTimer();
        }
    }

    squareKill(square) {
        return this.addKill(square.score);
    }

    addKill(score) {
        const scoreToAdd = score * this.comboMultiplier;

        this.totalScore += scoreToAdd;

        this.resetComboTimer();

        this.comboMultiplier++;

        return scoreToAdd;
    }

    resetComboTimer() {
        this.comboTimer = TIME_FOR_EACH_COMBO;
    }

    reset() {
        this.resetComboTimer();
        this.totalScore = 0;
    }

}