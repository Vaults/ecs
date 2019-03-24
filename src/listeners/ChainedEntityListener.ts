import {Entity} from "../Entity";
import {EntityListener} from "./EntityListener";

export class ChainedEntityListener extends EntityListener {
    constructor(private listener: EntityListener, private relevanceLambda: (e: Entity) => boolean) {
        super();
    }

    public isRelevant(e: Entity): boolean {
        return this.relevanceLambda(e);
    }

    protected push(entity: Entity): void {
        this.listener.take(entity);
    }

    protected pop(entity: Entity): void {
        this.listener.remove(entity);
    }

}