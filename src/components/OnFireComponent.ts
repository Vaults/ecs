import {Component} from "./base/Component";
import {ComponentConfiguration} from "./base/ComponentConfiguration";
import {NullConfiguration} from "./base/NullConfiguration";

export class OnFireComponent extends Component<NullConfiguration> {

    public createInitialConfiguration(): NullConfiguration {
        return new NullConfiguration();
    }

    public getConfiguration(): NullConfiguration {
        throw new Error("This component does not support parameters");
    }
}