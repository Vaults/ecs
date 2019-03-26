import {ComponentConfiguration} from "./base/ComponentConfiguration";

export class RenderableComponentConfiguration extends ComponentConfiguration {

    constructor(public color: string) {
        super();
    }
}