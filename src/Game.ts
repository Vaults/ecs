import {CoordinateComponent} from "./components/CoordinateComponent";
import {FlammableComponent} from "./components/FlammableComponent";
import {OnFireComponent} from "./components/OnFireComponent";
import {RenderableComponent} from "./components/RenderableComponent";
import {Entity} from "./Entity";
import {ChainedEntityListener} from "./listeners/ChainedEntityListener";
import {EntityListenerCombiner} from "./listeners/EntityListenerCombiner";
import {SystemListener} from "./listeners/SystemListener";
import {State} from "./State";
import {SystemRunner} from "./SystemRunner";
import {CanvasRenderSystem} from "./systems/CanvasRenderSystem";
import {DouseSystem} from "./systems/DouseSystem";
import {IgniteSystem} from "./systems/IgniteSystem";
import {ProximityColorIntensitySystem} from "./systems/ProximityColorIntensitySystem";
import {RandomMoveSystem} from "./systems/RandomMoveSystem";

const createEntity = (x: number, y: number) => {
    const ent = new Entity();
    ent.addComponent(new FlammableComponent());
    const coordinateComponent = new CoordinateComponent();
    ent.addComponent(coordinateComponent);
    coordinateComponent.getConfiguration().x = x;
    coordinateComponent.getConfiguration().y = y;
    ent.addComponent(new RenderableComponent());
    return ent;
};

document.addEventListener("DOMContentLoaded", () => {
    const state = new State();
    const systems = [];

    const igniteSystem = new IgniteSystem();
    const douseSystem = new DouseSystem();
    const renderSystem = new CanvasRenderSystem();
    const moveSystem = new RandomMoveSystem();
    const proximityColorSystem = new ProximityColorIntensitySystem();

    state.listeners = [
        new ChainedEntityListener(
            new EntityListenerCombiner([
                new ChainedEntityListener(
                    new EntityListenerCombiner([
                        new SystemListener(renderSystem),
                        new SystemListener(proximityColorSystem),
                    ]),
                    (e) => e.hasComponent(RenderableComponent.name),
                ),
                new SystemListener(moveSystem),
                new ChainedEntityListener(
                    new EntityListenerCombiner([
                        new SystemListener(igniteSystem),
                        new ChainedEntityListener(
                            new SystemListener(douseSystem),
                            (e) => e.hasComponent(OnFireComponent.name),
                        ),
                    ]),
                    (e) => (e.hasComponent(OnFireComponent.name) || e.hasComponent(FlammableComponent.name)),
                ),
            ]),
            (e) => e.hasComponent(CoordinateComponent.name),
        ),
    ];

    const entities = Array(500)
        .fill("")
        .map(() => createEntity(Math.floor(Math.random() * 400), Math.floor(Math.random() * 225)));
    entities[0].addComponent(new OnFireComponent());
    entities.forEach(entity => state.add(entity));

    systems.push(renderSystem);
    systems.push(douseSystem);
    systems.push(moveSystem);
    systems.push(proximityColorSystem);

    setTimeout(() => {
        systems.push(igniteSystem);
    }, 2000);

    const runner = new SystemRunner(state, systems);
    runner.run();
});