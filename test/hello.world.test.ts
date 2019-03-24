import {assert} from "chai";
import {Hello} from "../src/hello.world";

describe("should hello", () => {
    it("world", () => {
        assert.equal("Hello, world!", Hello.world());
    });
});