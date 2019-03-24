import {CoordinateComponent} from "./components/CoordinateComponent";
import {FlammableComponent} from "./components/FlammableComponent";
import {OnFireComponent} from "./components/OnFireComponent";
import {Entity} from "./Entity";
import {ChainedEntityListener} from "./listeners/ChainedEntityListener";
import {SystemListener} from "./listeners/SystemListener";
import {State} from "./State";
import {ConsoleRenderSystem} from "./systems/ConsoleRenderSystem";
import {FireSystem} from "./systems/FireSystem";
import {System} from "./systems/System";

export class SystemRunner {

    public state: State = new State();
    public systems: System[] = [];

    public init() {
        const system = new FireSystem();
        const renderSystem = new ConsoleRenderSystem();
        this.state.listeners = [
            new ChainedEntityListener(new SystemListener(renderSystem),
                (e) => e.hasComponent(CoordinateComponent.name)),
            new ChainedEntityListener(
              new SystemListener(system),
              (e) => (e.hasComponent(OnFireComponent.name) || e.hasComponent(FlammableComponent.name))
                  && e.hasComponent(CoordinateComponent.name)),
        ];

        const createEntity = (x: number, y: number) => {
            const ent = new Entity();
            ent.addComponent(new FlammableComponent());
            const coordinateComponent = new CoordinateComponent();
            ent.addComponent(coordinateComponent);
            coordinateComponent.getConfiguration().x = x;
            coordinateComponent.getConfiguration().y = y;
            this.state.add(ent);
        };

        const ent1 = new Entity();
        ent1.addComponent(new OnFireComponent());
        const coordinateComponent1 = new CoordinateComponent();
        ent1.addComponent(coordinateComponent1);
        ent1.addComponent(new OnFireComponent());
        this.state.add(ent1);

        Array(100).fill("").forEach(i => {
            createEntity(~~(Math.random() * 100), ~~(Math.random() * 40));
        });

        this.systems.push(renderSystem);

        setTimeout(() => {
            this.systems.push(system);
        }, 2000);

    }

    public run() {
        setInterval(() => {
            this.systems.forEach(sys => sys.step(this.state));
        }, 17);
    }
}