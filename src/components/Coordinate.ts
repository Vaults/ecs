import {ComponentConfiguration} from "./base/ComponentConfiguration";

export class Coordinate extends ComponentConfiguration {
    [key: string]: number;

    constructor(public x: number, public y: number) {
        super();
    }
}