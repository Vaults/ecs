import {Component} from "../components/base/Component";
import {CoordinateComponent} from "../components/CoordinateComponent";
import {CoordinateComponentConfiguration} from "../components/CoordinateComponent.configuration";
import {FlammableComponent} from "../components/FlammableComponent";
import {OnFireComponent} from "../components/OnFireComponent";
import {Entity} from "../Entity";
import {State} from "../State";
import {filterEntityListByComponent} from "../Util";
import {System} from "./System";

export class FireSystem extends System {

    public step(state: State): void {
        const flammable = filterEntityListByComponent(this.entities, FlammableComponent.name);
        const onfire = filterEntityListByComponent(this.entities, OnFireComponent.name);

        const dist = (a: CoordinateComponentConfiguration, b: CoordinateComponentConfiguration) => Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);

        flammable.forEach(flammableEntity => {
            const coords = flammableEntity.getComponent(CoordinateComponent.name);
            onfire.forEach(onfireEntity => {
               const fireCoords = onfireEntity.getComponent(CoordinateComponent.name);
                // @ts-ignore
               if (dist(coords.getConfiguration(), fireCoords.getConfiguration()) < 30) {
                    state.removeComponent(flammableEntity, FlammableComponent.name);
                    state.addComponent(flammableEntity, new OnFireComponent());
               }
            });
        });
    }

}