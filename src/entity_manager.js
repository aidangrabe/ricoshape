/**
 * A class for managing entities.
 * Entities automatically get added and removed from the stage when add/remove
 * are called.
 * Entities who are killed/inactive are automatically removed in the same update
 * loop.
 */
class EntityManager {

    constructor(stage) {
        this.stage = stage;
        this.entities = [];
    }

    add(entity) {
        this.entities.push(entity);

        if (entity.sprite != null) {
            this.stage.addChild(entity.sprite);
        }

        // TODO change to event?
        entity.onAddedToStage(this.stage);
    }

    remove(entity) {
        const pos = this.entities.indexOf(entity);

        if (pos != -1) {
            if (entity.sprite != null) {
                this.stage.removeChild(entity);
            }

            // TODO change to event?
            entity.onRemovedFromStage(this.stage);

            this.entities.splice(pos, 1);
        }
    }

    update(delta) {
        for (let entity of this.entities) {
            if (entity.active) {
                entity.update(delta);
            }
        }

        // remove dead entities
        // needs a 2nd for loop because we shouldn't modify the entities array
        // while looping
        for (let entity of this.entities) {
            if (!entity.active) {
                this.remove(entity);
            }
        }
    }

    onKeyPressed(key) {
        for (let entity of this.entities) {
            if (entity.active) {
                entity.onKeyPressed(key);
            }
        }
    }

}