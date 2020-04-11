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

    update(delta) {
        for (let entity of this.entities) {
            if (entity.active) {
                entity.update(delta);
            }
        }

        this.postUpdate(delta);
    }

    postUpdate(delta) {
        for (let entity of this.entities) {
            if (entity.active) {
                entity.postUpdate(delta);
            }
        }

        // remove dead entities
        this.entities = this.entities.filter((entity) => {
            if (!entity.active && entity.sprite != null) {
                this.stage.removeChild(entity);
                entity.onRemovedFromStage(this.stage);
            }

            return entity.active;
        });
    }

    onKeyPressed(key) {
        for (let entity of this.entities) {
            if (entity.active) {
                entity.onKeyPressed(key);
            }
        }
    }

}