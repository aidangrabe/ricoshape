class EntityGroup {

    constructor(entityManager, factory) {
        this.entityManager = entityManager;
        this.pool = new Pool(factory);

        this.items = [];
    }

    create() {
        const item = this.pool.aquire();

        item.reset();

        item.on('kill', (item) => {
            const pos = this.items.indexOf(item);
            if (pos != -1) {
                this.items.splice(pos, 1);
                this.pool.recycle(item);
            } else {
                throw new Error("Tried to remove an active item, but was not found");
            }
        });

        this.entityManager.add(item);
        this.items.push(item);

        return item;
    }

    checkForCollisionsWith(entity, onCollision) {
        if (!entity.active) {
            return;
        }

        const items = this.items;

        
        for (let i = items.length - 1; i >= 0; i--) {
            const item = items[i];

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

    reset() {
        // loop in reverse as we will be removing items from the array, which 
        // will mess up the indexing
        for (let i = this.items.length - 1; i >= 0; i--) {
            const item = this.items[i];
            item.kill();
        }

        if (this.items.length > 0) {
            throw new Error("Reset all items, but had non 0 left afterwards");
        }
    }

}