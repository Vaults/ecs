import {CoordinateComponent} from "../components/CoordinateComponent";
import {OnFireComponent} from "../components/OnFireComponent";
import {State} from "../State";
import {System} from "./System";

export class ConsoleRenderSystem extends System {

    private colorMap: {[n: number]: string} = {
        0: `\x1b[48;5;255m `,
        1: `\x1b[48;5;232m `,
        2: `\x1b[48;5;196m `,
    };

    public step(state: State): void {

        const renderMap = Array(50).fill(0).map(i => Array(100).fill(0));

        this.entities.forEach(ent => {
            const coords: CoordinateComponent = ent.getComponent(CoordinateComponent.name);
            renderMap[coords.getConfiguration().y][coords.getConfiguration().x] = 1;
            if (ent.hasComponent(OnFireComponent.name)) {
                renderMap[coords.getConfiguration().y][coords.getConfiguration().x] = 2;
            }
        });

        process.stdout.write(`\x1Bc\x1B[0f`);
        process.stdout.write(renderMap.map(y => y.map(x => this.colorMap[x]).join("")).join("\n"));
    }

}