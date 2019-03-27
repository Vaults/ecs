import {HSL} from "../util/HSL";
import {ComponentConfiguration} from "./base/ComponentConfiguration";

export class RenderableComponentConfiguration extends ComponentConfiguration {

    constructor(public color: HSL) {
        super();
    }
}