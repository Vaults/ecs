import {assert} from "chai";
import {Coordinate} from "../src/components/Coordinate";
import {CoordinateComponent} from "../src/components/CoordinateComponent";
import {Entity} from "../src/Entity";
import {QuadTree} from "../src/util/QuadTree";
import {QuadTreeBoundary} from "../src/util/QuadTreeBoundary";
import {getCoords} from "../src/util/Util";

describe("QuadTree", () => {
    it("should pass simple happy path test", () => {
        const original = Array(100).fill(0).map((_, i) => {
            const ent: Entity = new Entity();
            const coordinateComponent = new CoordinateComponent();
            coordinateComponent.getConfiguration().x = i;
            coordinateComponent.getConfiguration().y = i;
            ent.addComponent(coordinateComponent);
            return ent;
        });

        const range = new QuadTreeBoundary(new Coordinate(50, 50), 50);
        const quadTree = new QuadTree(range, original, 4);
        const result = quadTree.query(range);

        assert.sameMembers(original, result);
    });

    it("simple happy path test with different range than quadtree size", () => {
        const original = Array(100).fill(0).map((_, i) => {
            const ent: Entity = new Entity();
            const coordinateComponent = new CoordinateComponent();
            coordinateComponent.getConfiguration().x = i;
            coordinateComponent.getConfiguration().y = i;
            ent.addComponent(coordinateComponent);
            return ent;
        });

        const range = new QuadTreeBoundary(new Coordinate(50, 50), 10);
        const naivelyFiltered = original.filter(entity => range.containsCoord(getCoords(entity)));

        const treeBoundary = new QuadTreeBoundary(new Coordinate(50,  50), 100);
        const quadTree = new QuadTree(treeBoundary, original, 50);
        const result = quadTree.query(range);

        assert.sameMembers(naivelyFiltered.map(ent => getCoords(ent).x).sort(), result.map(ent => getCoords(ent).x).sort());
    });

    it("should pass random integration tests for correctness", () => {
        Array(100).fill(0).forEach(() => {
            const original = Array(50).fill(0).map(() => {
                const ent: Entity = new Entity();
                const coordinateComponent = new CoordinateComponent();
                coordinateComponent.getConfiguration().x = Math.random() * 100;
                coordinateComponent.getConfiguration().y = Math.random() * 100;
                ent.addComponent(coordinateComponent);
                return ent;
            });

            const range = new QuadTreeBoundary(new Coordinate(Math.random() * 50, Math.random() * 50), Math.random() * 50);

            const naivelyFiltered = original.filter(entity => range.containsCoord(getCoords(entity)));
            const treeBoundary = new QuadTreeBoundary(new Coordinate(50,  50), 50);
            const result = new QuadTree(treeBoundary, original).query(range);

            assert.sameMembers(naivelyFiltered, result);
        });
    });
});