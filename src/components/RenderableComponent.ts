import {Component} from "./base/Component";
import {NullConfiguration} from "./base/NullConfiguration";
import {Coordinate} from "./Coordinate";
import {RenderableComponentConfiguration} from "./RenderableComponent.configuration";

export class RenderableComponent extends Component<RenderableComponentConfiguration> {

    public createInitialConfiguration(): RenderableComponentConfiguration {
        return new RenderableComponentConfiguration(`hsl(${Math.random() * 360}, 90%, 90%)`);
    }

}