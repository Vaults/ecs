import {CoordinateComponent} from "./components/CoordinateComponent";
import {FlammableComponent} from "./components/FlammableComponent";
import {OnFireComponent} from "./components/OnFireComponent";
import {Entity} from "./Entity";
import {ChainedEntityListener} from "./listeners/ChainedEntityListener";
import {SystemListener} from "./listeners/SystemListener";
import {State} from "./State";
import {FireSystem} from "./systems/FireSystem";
import {System} from "./systems/System";

export class SystemRunner {

    public state: State = new State();
    public systems: System[] = [];

    public init() {
        const system = new FireSystem();
        this.state.listeners = [
          new ChainedEntityListener(
              new SystemListener(system),
              (e) => e.listComponents().some(c => c instanceof FlammableComponent || c instanceof OnFireComponent)
                  &&
                  e.listComponents().some(c => c instanceof CoordinateComponent)
              ),
        ];

        const entity = new Entity();
        entity.addComponent(new OnFireComponent());
        entity.addComponent(new CoordinateComponent());

        const entity2 = new Entity();
        entity2.addComponent(new FlammableComponent());
        const coordinateComponent1 = new CoordinateComponent();
        coordinateComponent1.getConfiguration().x = 5;
        entity2.addComponent(coordinateComponent1);

        const entity3 = new Entity();
        entity3.addComponent(new FlammableComponent());
        const coordinateComponent2 = new CoordinateComponent();
        coordinateComponent2.getConfiguration().x = 14;
        entity3.addComponent(coordinateComponent2);

        const entity4 = new Entity();
        entity4.addComponent(new FlammableComponent());
        const coordinateComponent3 = new CoordinateComponent();
        coordinateComponent3.getConfiguration().x = 45;
        entity4.addComponent(coordinateComponent3);


        this.state.add(entity);
        this.state.add(entity2);
        this.state.add(entity3);
        this.state.add(entity4);
        this.systems.push(system);
    }

    public run() {
        setInterval(() => {
            this.systems.forEach(sys => sys.step(this.state));
        }, 0, 30);
    }
}