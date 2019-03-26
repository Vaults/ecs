import {Coordinate} from "../components/Coordinate";

export type Range1D = {left: number, right: number};
export class QuadTreeBoundary {
    constructor(public coords: Coordinate, public halfDimension: number) { }

    public containsCoord(c: Coordinate) {
        const leftBoundary = this.coords.x - this.halfDimension;
        const rightBoundary = this.coords.x + this.halfDimension;
        const upBoundary = this.coords.y - this.halfDimension;
        const downBoundary = this.coords.y + this.halfDimension;

        return c.x >= leftBoundary && c.x < rightBoundary && c.y >= upBoundary && c.y < downBoundary;
    }

    public intersects(other: QuadTreeBoundary) {
        const rangeOverlap = (r1: Range1D, r2: Range1D) => r1.left <= r2.right && r1.right >= r2.left;
        return rangeOverlap(this.toRange("x"), other.toRange("x")) && rangeOverlap(this.toRange("y"), other.toRange("y"));
    }

    public toRange(dimension: string): Range1D {
        return {left: this.coords[dimension] - this.halfDimension, right: this.coords[dimension] + this.halfDimension};
    }
}