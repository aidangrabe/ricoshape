class Pool {

    constructor(factory) {
        this.factory = factory;

        this.items = [];
    }

    aquire() {
        if (this.items.length > 0) {
            return this.items.pop();
        }

        return this.factory();
    }

    recycle(item) {
        this.items.push(item);
    }

}