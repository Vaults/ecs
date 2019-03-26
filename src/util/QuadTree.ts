import {Coordinate} from "../components/Coordinate";
import {Entity} from "../Entity";
import {QuadTreeBoundary} from "./QuadTreeBoundary";
import {getCoords} from "./Util";

export class QuadTree {

    private nw: QuadTree | undefined;
    private ne: QuadTree | undefined;
    private sw: QuadTree | undefined;
    private se: QuadTree | undefined;

    constructor(private boundary: QuadTreeBoundary, private elements: Entity[], private capacity: number = 4) {
        if (elements.length > capacity) {
            this.subdivide();
        }
    }

    public query(range: QuadTreeBoundary): Entity[] {
        if (!range.intersects(this.boundary)) {
            return [];
        }

        if (this.elements.length > 0) {
            return this.elements.filter(entity => range.containsCoord(getCoords(entity)));
        } else {
            const queryWithNullable = (q: QuadTree | undefined, r: QuadTreeBoundary) => (q) ? q.query(r) : [];
            return [
                queryWithNullable(this.ne, range),
                queryWithNullable(this.nw, range),
                queryWithNullable(this.sw, range),
                queryWithNullable(this.se, range),
            ].reduce((acc, next) => acc.concat(next), []);
        }
    }

    private subdivide(): void {
        const quarterDimension = this.boundary.halfDimension / 2;
        const coords = this.boundary.coords;

        const nwBoundary = new QuadTreeBoundary(new Coordinate(coords.x - quarterDimension, coords.y + quarterDimension), quarterDimension);
        const neBoundary = new QuadTreeBoundary(new Coordinate(coords.x + quarterDimension, coords.y + quarterDimension), quarterDimension);
        const swBoundary = new QuadTreeBoundary(new Coordinate(coords.x - quarterDimension, coords.y - quarterDimension), quarterDimension);
        const seBoundary = new QuadTreeBoundary(new Coordinate(coords.x + quarterDimension, coords.y - quarterDimension), quarterDimension);

        this.nw = new QuadTree(nwBoundary, [], this.capacity);
        this.ne = new QuadTree(neBoundary, [], this.capacity);
        this.sw = new QuadTree(swBoundary, [], this.capacity);
        this.se = new QuadTree(seBoundary, [], this.capacity);

        this.elements.forEach(entity => {
           this.nw!.insert(entity);
           this.ne!.insert(entity);
           this.sw!.insert(entity);
           this.se!.insert(entity);
        });
        this.elements = [];
    }

    private insert(e: Entity) {
        const coords = getCoords(e);
        if (this.boundary.containsCoord(coords)) {
            if (this.ne === undefined) {
                this.elements.push(e);
                if (this.elements.length > this.capacity) {
                    this.subdivide();
                }
            } else {
                this.nw!.insert(e);
                this.ne!.insert(e);
                this.sw!.insert(e);
                this.se!.insert(e);
            }
        }
    }

}