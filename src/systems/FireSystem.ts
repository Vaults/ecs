import {Component} from "../components/base/Component";
import {CoordinateComponent} from "../components/CoordinateComponent";
import {CoordinateComponentConfiguration} from "../components/CoordinateComponent.configuration";
import {FlammableComponent} from "../components/FlammableComponent";
import {OnFireComponent} from "../components/OnFireComponent";
import {Entity} from "../Entity";
import {State} from "../State";
import {filterByCriteria, findComponent} from "../Util";
import {System} from "./System";

export class FireSystem extends System {

    public findIt(e: Entity, l: (c: Component<any>) => boolean) {
        return e.listComponents().find(l);
    }

    public step(state: State): void {

        const flammable = filterByCriteria(this.entities, c => c instanceof FlammableComponent);
        const onfire = filterByCriteria(this.entities, c => c instanceof OnFireComponent);

        const dist = (a: CoordinateComponentConfiguration, b: CoordinateComponentConfiguration) => Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);

        flammable.forEach(flammableEntity => {
            const coords = findComponent(flammableEntity, c => c instanceof CoordinateComponent);
            onfire.forEach(onfireEntity => {
               const fireCoords = findComponent(onfireEntity, c => c instanceof CoordinateComponent);
                // @ts-ignore
                if (dist(coords.getConfiguration(), fireCoords.getConfiguration()) < 10) {
                    state.removeComponent(flammableEntity, findComponent(flammableEntity, c => c instanceof FlammableComponent) as FlammableComponent);
                    state.addComponent(flammableEntity, new OnFireComponent());
               }
            });
        });
    }

}