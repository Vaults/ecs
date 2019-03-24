import {Entity} from "../Entity";
import {System} from "../systems/System";
import {removeFromArray} from "../Util";

export abstract class EntityListener {
    public entities: Entity[] = [];

    public abstract isRelevant(e: Entity): boolean;

    public take(e: Entity) {
        if (this.isRelevant(e)) {
            if (!this.entities.includes(e)) {
                this.entities.push(e);
                this.push(e);
            }
        } else {
            this.remove(e);
        }
    }

    public remove(e: Entity) {
        this.entities = removeFromArray(this.entities, e);
        this.pop(e);
    }

    protected abstract push(entity: Entity): void;
    protected abstract pop(entity: Entity): void;
}
