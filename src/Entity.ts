import uuid = require("uuid");
import {Component} from "./components/base/Component";
import {removeFromArray} from "./Util";

export class Entity {

    public readonly ID: string = uuid.v4();
    private components: Array<Component<any>> = [];

    public addComponent(c: Component<any>) {
        this.components.push(c);
    }

    public removeComponent(c: Component<any>) {
        this.components = removeFromArray(this.components, c);
    }

    public listComponents() {
        // Cheap list copy
        return this.components.map(x => x);
    }
}