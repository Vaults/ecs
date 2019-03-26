import {Component} from "./base/Component";
import {NullConfiguration} from "./base/NullConfiguration";
import {Coordinate} from "./Coordinate";

export class CoordinateComponent extends Component<Coordinate> {

    public createInitialConfiguration(): Coordinate {
        return new Coordinate(0, 0);
    }

}