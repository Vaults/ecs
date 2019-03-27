import {Coordinate} from "../components/Coordinate";
import {CoordinateComponent} from "../components/CoordinateComponent";
import {Entity} from "../Entity";
import {QuadTree} from "./QuadTree";
import {QuadTreeBoundary} from "./QuadTreeBoundary";

export const removeFromArray = <T>(arr: T[], elt: T) => {
    return arr.filter(x => x !== elt);
};

export const filterEntityListByComponent = (entities: Entity[], c: string) => {
    return entities.filter(e => e.hasComponent(c));
};

export const getCoords = (e: Entity) => e.getComponent(CoordinateComponent.name).getConfiguration();

export type ProximityTuple = {neighbors: Entity[], root: Entity};

export const getProximityTuples = (varr: Entity[], warr: Entity[], d: number): ProximityTuple[] => {
    const tree: QuadTree = new QuadTree(new QuadTreeBoundary(new Coordinate(800, 800), 800), warr, Math.sqrt(warr.length));

    return varr.map(entV => {
        return {
            neighbors: tree.query(new QuadTreeBoundary(getCoords(entV), d)),
            root: entV,
        };
    });
};

