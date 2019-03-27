export class HSL {
    constructor(public hue: number, public saturation: number, public lightness: number) {}

    public toString(): string{
        return `hsl(${this.hue}, ${this.saturation * 100}%, ${this.lightness * 100}%)`;
    }
}