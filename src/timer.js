class Timer {
    
    constructor(time, callback) {
        this.resetTime = time;
        this.timeLeft = time;
        this.callback = callback;
        this.active = false;
    }

    start() {
        this.active = true;
    }

    pause() {
        this.active = false;
    }

    stop() {
        this.active = false;
        this.timeLeft = this.resetTime;
    }

    restart() {
        this.stop();
        this.start();
    }

    update(delta) {
        if (!this.active) {
            return;
        }

        this.timeLeft -= delta;

        if (this.timeLeft <= 0) {
            this.stop();
            this.callback();
        }
    }

}