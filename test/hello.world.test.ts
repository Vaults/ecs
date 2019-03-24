import {assert} from "chai";
import {SystemRunner} from "../src/SystemRunner";

describe("should hello", () => {
    it("world", (done) => {
        const systemRunner = new SystemRunner();
        systemRunner.init();
        systemRunner.run();

        setTimeout(() => {
            assert.isTrue(true);
            done();
        }, 1000);
    });
});