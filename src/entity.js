class Entity {

    get active() {
        return this._active;
    }

    set active(active) {
        this._active = active;
        this.onActiveChanged(active);
    }

    constructor() {
        this._active = true;
        this.sprite = null;
    }

    onAddedToStage(stage) {
    }

    onActiveChanged(active) {
        this.sprite.visible = active;
    }

    update(delta) {
    }

    onRemovedFromStage(stage) {
    }

    onKeyPressed(key) {
    }

    kill() {
        this.active = false;
    }

}