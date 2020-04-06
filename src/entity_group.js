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

    checkForCollisionsWith(entity, onCollision) {
        if (!entity.active) {
            return;
        }

        const items = this.items;

        for (let item of items) {
            // ignore inactive items, even though items should only contain 
            // active entities
            if (!item.active) {
                continue;
            }

            if (entity.intersects(item.sprite)) {
                entity.emitEvent('collision', item);
                item.emitEvent('collision', entity);
                onCollision(item);
            }
        }
    }

}