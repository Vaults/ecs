import {assert} from "chai";
import {Coordinate} from "../src/components/Coordinate";
import {QuadTreeBoundary} from "../src/util/QuadTreeBoundary";

describe("QuadTreeBoundary - intersect", () => {

    it("should intersect correct cases", () => {
        const base = new QuadTreeBoundary(new Coordinate(0, 0), 100);
        assert.isTrue(base.intersects(new QuadTreeBoundary(new Coordinate(0, 0), 100)));
        assert.isTrue(base.intersects(new QuadTreeBoundary(new Coordinate(50, 0), 1)));
        assert.isTrue(base.intersects(new QuadTreeBoundary(new Coordinate(-50, 0), 20)));
        assert.isTrue(base.intersects(new QuadTreeBoundary(new Coordinate(50, 50), 40)));
        assert.isTrue(base.intersects(new QuadTreeBoundary(new Coordinate(-50, -50), 90)));
    });

    it("should not intersect bad cases", () => {
        const base = new QuadTreeBoundary(new Coordinate(0, 0), 100);
        assert.isFalse(base.intersects(new QuadTreeBoundary(new Coordinate(200, 200), 50)));
        assert.isFalse(base.intersects(new QuadTreeBoundary(new Coordinate(5000, 0), 3213)));
        assert.isFalse(base.intersects(new QuadTreeBoundary(new Coordinate(-5000, 0), 21)));
        assert.isFalse(base.intersects(new QuadTreeBoundary(new Coordinate(5000, 5000), 13)));
        assert.isFalse(base.intersects(new QuadTreeBoundary(new Coordinate(-500, -5000), 113)));
    });

    it("should be commutative", () => {
        const base = new QuadTreeBoundary(new Coordinate(0, 0), 100);
        assert.isTrue(base.intersects(new QuadTreeBoundary(new Coordinate(-50, -50), 100)));
        assert.isTrue(new QuadTreeBoundary(new Coordinate(-50, -50), 100).intersects(base));
    });
});

describe("QuadTreeBoundary - toRange", () => {

    it("should work for x", () => {
        const base = new QuadTreeBoundary(new Coordinate(50, 80), 10);
        const range = base.toRange("x");

        assert.equal(40, range.left);
        assert.equal(60, range.right);
    });

    it("should work for y", () => {
        const base = new QuadTreeBoundary(new Coordinate(50, 80), 10);
        const range = base.toRange("y");

        assert.equal(70, range.left);
        assert.equal(90, range.right);
    });

});

describe("QuadTreeBoundary - containsCoord", () => {

    it("single bad case", () => {
        const base = new QuadTreeBoundary(new Coordinate(75, 25), 25);
        assert.isFalse(base.containsCoord(new Coordinate(52, 52)));
    });

    it("should return true for happy cases", () => {
        const base = new QuadTreeBoundary(new Coordinate(50, 50), 50);
        Array(100).fill(0).map(() => {
            return new Coordinate(Math.random() * 100, Math.random() * 100);
        }).forEach(coord => {
            assert.isTrue(base.containsCoord(coord));
        });
    });

    it("should return false for bad cases", () => {
        const base = new QuadTreeBoundary(new Coordinate(50, 50), 50);
        Array(100).fill(0).map(() => {
            return new Coordinate(Math.random() * 1000, Math.random() * 1000);
        }).filter(coord => {
          return !((coord.x >= 0 && coord.x <= 100) && (coord.y >= 0 && coord.y <= 100));
        }).forEach(coord => {
            assert.isFalse(base.containsCoord(coord));
        });
    });

});