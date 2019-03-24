import {Component} from "./components/base/Component";
import {Entity} from "./Entity";

export const removeFromArray = <T>(arr: T[], elt: T) => {
    return arr.filter(x => x !== elt);
};

export type Criteria = (c: Component<any>) => boolean;

export const findComponent = (e: Entity, l: Criteria) => e.listComponents().find(l);
export const hasComponent = (e: Entity, l: Criteria) => e.listComponents().some(l);
export const filterByCriteria = (entities: Entity[], l: Criteria) => entities.filter(e => hasComponent(e, l));