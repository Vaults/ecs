import {ComponentConfiguration} from "./ComponentConfiguration";
import {NullConfiguration} from "./NullConfiguration";

export abstract class Component<T extends ComponentConfiguration> {

    protected configuration: T;

    constructor() {
        this.configuration = this.createInitialConfiguration();
    }

    public abstract createInitialConfiguration(): T;

    public setConfiguration(configuration: T) {
        this.configuration = configuration;
    }

    public getConfiguration(): T {
        return this.configuration;
    }
}