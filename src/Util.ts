import {Entity} from "./Entity";

export const removeFromArray = <T>(arr: T[], elt: T) => {
    return arr.filter(x => x !== elt);
};

export const filterEntityListByComponent = (entities: Entity[], c: string) => {
    return entities.filter(e => e.hasComponent(c));
};