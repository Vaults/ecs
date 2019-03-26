import uuid = require("uuid");
import {Component} from "./components/base/Component";

export class Entity {

    public readonly ID: string = uuid.v4();
    private components: {[key: string]: Component<any>} = {};

    public addComponent(c: Component<any>) {
        this.components[c.constructor.name] = c;
    }

    public getComponent(c: string) {
        return this.components[c];
    }

    public hasComponent(c: string) {
        return this.components[c] !== undefined;
    }

    public removeComponent(c: string) {
        delete this.components[c];
    }

}