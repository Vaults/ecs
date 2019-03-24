import {Component} from "./components/base/Component";
import {Entity} from "./Entity";
import {EntityListener} from "./listeners/EntityListener";
import {removeFromArray} from "./Util";

export class State {

    public entities: Entity[] = [];
    public listeners: EntityListener[] = [];

    public constructor() {  }

    public add(e: Entity) {
        this.entities.push(e);
        this.listeners.forEach(listener => listener.take(e));
    }

    public addComponent(e: Entity, c: Component<any>) {
        e.addComponent(c);
        this.listeners.forEach(listener => listener.take(e));
    }

    public removeComponent(e: Entity, c: Component<any>) {
        e.removeComponent(c);
        this.listeners.forEach(listener => listener.take(e));
    }

    public remove(e: Entity) {
        this.entities = removeFromArray(this.entities, e);
        this.listeners.forEach(listener => listener.remove(e));
    }


}