import {State} from "./State";
import {System} from "./systems/System";
import {Logger} from "./util/Logger";

export class SystemRunner {

    constructor(private state: State, private systems: System[]) { }

    public run() {
        let frameCount = 0;
        setInterval(() => {
            const start = window.performance.now();
            this.systems.forEach(sys => sys.step(this.state));
            Logger.debug(`Frame ${frameCount++} - time taken ${window.performance.now() - start} ms`);
        }, 17);
    }
}