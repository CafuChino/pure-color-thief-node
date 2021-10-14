/// <reference types="node" />
import { NdArray } from 'ndarray';
declare class ColorThief {
    sourceImageData: null | NdArray;
    type: null | string;
    constructor();
    private _getPixels;
    loadImage(image: Buffer | string, type?: string | null): Promise<NdArray<import("ndarray").Data<number>> | null>;
    getColorPalette(colorCount: number): [number, number, number][];
    getColor(): [number, number, number];
}
export default ColorThief;
