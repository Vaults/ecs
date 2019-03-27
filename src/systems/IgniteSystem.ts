import {FlammableComponent} from "../components/FlammableComponent";
import {OnFireComponent} from "../components/OnFireComponent";
import {State} from "../State";
import {filterEntityListByComponent, getProximityTuples} from "../util/Util";
import {System} from "./System";

export class IgniteSystem extends System {

    public step(state: State): void {
        const flammable = filterEntityListByComponent(this.entities, FlammableComponent.name);
        const onFire = filterEntityListByComponent(this.entities, OnFireComponent.name);

        const toIgniteTuples = getProximityTuples(onFire, flammable, 8);

        toIgniteTuples.forEach(tuple => {
            tuple.neighbors.forEach(neighbor => {
                state.removeComponent(neighbor, FlammableComponent.name);
                state.addComponent(neighbor, new OnFireComponent());
            });
        });
    }

}