import {HSL} from "../util/HSL";
import {Component} from "./base/Component";
import {RenderableComponentConfiguration} from "./RenderableComponent.configuration";

export class RenderableComponent extends Component<RenderableComponentConfiguration> {

    public createInitialConfiguration(): RenderableComponentConfiguration {
        return new RenderableComponentConfiguration(new HSL(Math.random() * 360, 0.5, 0.5));
    }

}