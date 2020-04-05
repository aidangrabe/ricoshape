class EventEmitter {

    constructor() {
        this.listeners = {};
    }

    emit(event, payload) {
        const listeners = this.listeners[event] || [];

        for (let listener of listeners) {
            listener(payload);
        }
    }

    on(event, listener) {
        const list = this.listeners[event] || [];
        list.push(listener);
        this.listeners[event] = list;
    }

    removeListener(event, listener) {
        const list = this.listeners[event] || [];
        const position = list.indexOf(listener);

        if (position != -1) {
            list.splice(position, 1);
        }
    }

    removeAllListeners() {
        this.listeners = {};
    }

}