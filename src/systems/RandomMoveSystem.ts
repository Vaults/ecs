import {CoordinateComponent} from "../components/CoordinateComponent";
import {State} from "../State";
import {System} from "./System";

export class RandomMoveSystem extends System {

    public step(state: State): void {
        this.entities.forEach(ent => {
            const coords: CoordinateComponent = ent.getComponent(CoordinateComponent.name);
            const coordsConf = coords.getConfiguration();

            const mod = () => Math.random() < 0.1 ? (Math.random() > 0.5 ? 1 : -1) : 0;

            coordsConf.x += mod();
            coordsConf.y += mod();
        });
    }

}