import {Component} from "./base/Component";
import {NullConfiguration} from "./base/NullConfiguration";
import {CoordinateComponentConfiguration} from "./CoordinateComponent.configuration";

export class CoordinateComponent extends Component<CoordinateComponentConfiguration> {

    public createInitialConfiguration(): CoordinateComponentConfiguration {
        return new CoordinateComponentConfiguration(0, 0);
    }

}