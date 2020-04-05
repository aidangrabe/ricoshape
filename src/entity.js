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
        this._emitter = new EventEmitter();
        this.sprite = null;
    }

    on(event, listener) {
        this._emitter.on(event, listener);
    }

    removeEventListener(event, listener) {
        this._emitter.removeListener(event, listener);
    }

    onAddedToStage(stage) {
        this.emitEvent('stage.add');
    }

    onActiveChanged(active) {
        this.sprite.visible = active;
    }

    update(delta) {
    }

    onRemovedFromStage(stage) {
        this.emitEvent('stage.remove');
    }

    onKeyPressed(key) {
    }

    emitEvent(event, payload) {
        this._emitter.emit(event, payload);
    }

    kill() {
        this.emitEvent('kill', this);
        this._emitter.removeAllListeners();
        this.active = false;
    }

}