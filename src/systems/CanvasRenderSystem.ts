import {CoordinateComponent} from "../components/CoordinateComponent";
import {OnFireComponent} from "../components/OnFireComponent";
import {RenderableComponent} from "../components/RenderableComponent";
import {State} from "../State";
import {System} from "./System";

export class CanvasRenderSystem extends System {

    private static readonly CELL_SIZE = 4;
    private static readonly SIZE_X = 1600;
    private static readonly SIZE_Y = 1600;
    private static readonly CELLS_X = CanvasRenderSystem.SIZE_X / CanvasRenderSystem.CELL_SIZE;
    private static readonly CELLS_Y = CanvasRenderSystem.SIZE_Y / CanvasRenderSystem.CELL_SIZE;
    private ctx: CanvasRenderingContext2D;

    constructor() {
        super();
        const canvas = document.getElementById("renderArea") as HTMLCanvasElement;
        this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    }

    public step(state: State): void {
        this.ctx.clearRect(0, 0, CanvasRenderSystem.SIZE_X, CanvasRenderSystem.SIZE_Y);
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, CanvasRenderSystem.SIZE_X, CanvasRenderSystem.SIZE_Y);
        const renderMap = Array(CanvasRenderSystem.CELLS_Y).fill(0).map(i => Array(CanvasRenderSystem.CELLS_X).fill("white"));

        this.entities.forEach(ent => {
            const coords: CoordinateComponent = ent.getComponent(CoordinateComponent.name);
            const conf = coords.getConfiguration();
            if (conf.x >= 0 && conf.y >= 0 && conf.x < CanvasRenderSystem.CELLS_X && conf.y < CanvasRenderSystem.CELLS_Y) {
                renderMap[conf.y][conf.x] = ent.getComponent(RenderableComponent.name).getConfiguration().color;
                if (ent.hasComponent(OnFireComponent.name)) {
                    renderMap[conf.y][conf.x] = "red";
                }
            }
        });

        renderMap.forEach((col, y) => {
            col.forEach((cell, x) => {
               if (cell !== "white") {
                   this.ctx.fillStyle = cell;
                   const half = CanvasRenderSystem.CELL_SIZE / 2;
                   this.ctx.fillRect(x * CanvasRenderSystem.CELL_SIZE - half, y * CanvasRenderSystem.CELL_SIZE - half, CanvasRenderSystem.CELL_SIZE, CanvasRenderSystem.CELL_SIZE);
               }
            });
        });
    }

}