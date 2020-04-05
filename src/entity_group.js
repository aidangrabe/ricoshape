class EntityGroup {

    constructor(entityManager, factory) {
        this.entityManager = entityManager;
        this.pool = new Pool(factory);

        this.items = [];
    }

    create() {
        const item = this.pool.aquire();

        item.reset();

        this.entityManager.add(item);
        this.items.push(item);

        return item;
    }

}