import {FlammableComponent} from "../components/FlammableComponent";
import {OnFireComponent} from "../components/OnFireComponent";
import {State} from "../State";
import {System} from "./System";

export class DouseSystem extends System {

    public step(state: State): void {
        this.entities.forEach(entity => {
            if (Math.random() < 0.001) {
                state.removeComponent(entity, OnFireComponent.name);
                if (Math.random() > 0.5) {
                    state.addComponent(entity, new FlammableComponent());
                }
            }
        });
    }

}