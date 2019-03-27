import {RenderableComponent} from "../components/RenderableComponent";
import {State} from "../State";
import {HSL} from "../util/HSL";
import {getProximityTuples} from "../util/Util";
import {System} from "./System";

export class ProximityColorIntensitySystem extends System {

    public step(state: State): void {
        const tuples = getProximityTuples(this.entities, this.entities, 10);

        tuples.forEach(tuple => {
            const amount = tuple.neighbors.length;
            const color: HSL = tuple.root.getComponent(RenderableComponent.name).getConfiguration().color;

            color.saturation = 0.5 + 0.01 * amount * amount;
            color.lightness = 0.98 - 0.01 * amount * amount;
        });
    }

}