import {Entity} from "../Entity";
import {EntityListener} from "./EntityListener";

export class EntityListenerCombiner extends EntityListener {

    constructor(private listeners: EntityListener[]) {
        super();
    }

    public isRelevant(e: Entity): boolean {
        return true;
    }

    protected push(entity: Entity): void {
        this.listeners.forEach(listener => listener.take(entity));
    }

    protected pop(entity: Entity): void {
        this.listeners.forEach(listener => listener.remove(entity));
    }

}
