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
        // if (entity in this.entities) {
        //     throw new Error("Already added!!");
        // }
        
        this.entities.push(entity);
        this.stage.addChild(entity.sprite);
        entity.onAddedToStage(this.stage);
    }

    remove(entity) {
        const pos = this.entities.indexOf(entity);

        if (pos != -1) {
            this.stage.removeChild(entity);
            this.entities[pos].onRemovedFromStage(this.stage);
            this.entities.splice(pos, 1);
        }
    }

    update(delta) {
        for (let entity of this.entities) {
            if (entity.active) {
                entity.update(delta);
            }
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