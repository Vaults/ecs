import {Entity} from "../Entity";
import {System} from "../systems/System";
import {EntityListener} from "./EntityListener";

export class SystemListener extends EntityListener {

    constructor(private system: System) {
        super();
    }

    public isRelevant(e: Entity): boolean {
        return true;
    }

    protected pop(entity: Entity): void {
        this.system.setEntities(this.entities);
    }

    protected push(entity: Entity): void {
        this.system.setEntities(this.entities);
    }


}
