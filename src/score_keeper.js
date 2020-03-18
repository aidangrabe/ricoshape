const TIME_FOR_EACH_COMBO = 1 * 60; // seconds

const ScoreKeeper = {

    totalScore: 0,
    comboMultiplier: 1,
    comboTimer: TIME_FOR_EACH_COMBO,

    update: function (delta) {
        if (this.comboMultiplier > 1) {
            this.comboTimer -= delta;

            if (this.comboTimer <= 0) {
                this.comboMultiplier -= 1;

                this.resetComboTimer();
            }
        } else {
            this.resetComboTimer();
        }
    },

    squareKill: function (square) {
        return this.addKill(square.score);
    },

    addKill: function (score) {
        const scoreToAdd = score * this.comboMultiplier;

        this.totalScore += scoreToAdd;

        this.resetComboTimer();

        this.comboMultiplier++;

        return scoreToAdd;
    },

    resetComboTimer: function () {
        this.comboTimer = TIME_FOR_EACH_COMBO;
    }

}