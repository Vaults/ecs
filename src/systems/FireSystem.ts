import {Component} from "../components/base/Component";
import {CoordinateComponent} from "../components/CoordinateComponent";
import {FlammableComponent} from "../components/FlammableComponent";
import {OnFireComponent} from "../components/OnFireComponent";
import {Entity} from "../Entity";
import {State} from "../State";
import {System} from "./System";

export class FireSystem extends System {

    public step(state: State): void {
        const flammable = this.entities.filter(x => x.listComponents().some(c => c instanceof FlammableComponent));
        const onfire = this.entities.filter(x => x.listComponents().some(c => c instanceof OnFireComponent));

        const getCoords = (entity: Entity) => entity.listComponents().find(c => c instanceof CoordinateComponent) as CoordinateComponent;

        flammable.forEach(flammableEntity => {
            const coords: CoordinateComponent = getCoords(flammableEntity);
            onfire.forEach(onfireEntity => {
               const fireCoords = getCoords(onfireEntity);
               if (Math.abs(coords.getConfiguration().x - fireCoords.getConfiguration().x) < 10) {
                    state.removeComponent(flammableEntity, flammableEntity.listComponents().find(c => c instanceof FlammableComponent) as Component<any>);
                    state.addComponent(flammableEntity, new OnFireComponent());
                    console.log("On Fire!", flammableEntity);
               }
            });
        });
    }

}