import {ComponentConfiguration} from "./base/ComponentConfiguration";


export class CoordinateComponentConfiguration extends ComponentConfiguration {

    constructor(public x: number, public y: number) {
        super();
    }
}