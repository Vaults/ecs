import {Entity} from "../Entity";
import {State} from "../State";

export abstract class System {

    protected entities: Entity[] = [];

    public setEntities(entities: Entity[]) {
        this.entities = entities;
    }

    public abstract step(state: State): void;

}
