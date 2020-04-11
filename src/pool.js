class Pool {

    constructor(factory) {
        this.poolingEnabled = true;

        this.factory = factory;

        this.items = [];
    }

    aquire() {
        if (this.poolingEnabled && this.items.length > 0) {
            // get from the pool
            return this.items.pop();
        }

        // create from scratch
        return this.factory();
    }

    recycle(item) {
        this.items.push(item);
    }

}