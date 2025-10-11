import { DatasetF64I32, DatasetF64F64, DatasetF64U32 } from '../core-bindings/index.js';
import type { YType } from '../index.js';
import { DenseMatrix } from '../linalg/index.js';
type DatasetRs = DatasetF64F64 | DatasetF64I32 | DatasetF64U32;
declare class Dataset {
    inner: DatasetRs;
    constructor(inner: DatasetRs);
}
interface LoadParams {
    returnXY?: boolean;
    unsigned?: boolean;
}
declare function loadIris(params?: LoadParams): Dataset | [DenseMatrix, YType];
declare function loadBoston(params?: LoadParams): Dataset | [DenseMatrix, YType];
declare function loadBreastCancer(params?: LoadParams): Dataset | [DenseMatrix, YType];
declare function loadDiabetes(params?: LoadParams): Dataset | [DenseMatrix, YType];
declare function loadDigits(params?: LoadParams): Dataset | [DenseMatrix, YType];
interface IMakeCircles extends LoadParams {
    numSamples: number;
    factor: number;
    noise: number;
}
declare function makeCircles(params: IMakeCircles): Dataset | [DenseMatrix, YType];
interface IMakeBlobs extends LoadParams {
    numSamples: number;
    numFeatures: number;
    numCenters: number;
}
declare function makeBlobs(params: IMakeBlobs): Dataset | [DenseMatrix, YType];
interface IMakeMoons extends LoadParams {
    numSamples: number;
    noise: number;
}
declare function makeMoons(params: IMakeMoons): Dataset | [DenseMatrix, YType];
export { loadIris, loadBoston, loadBreastCancer, loadDiabetes, loadDigits, makeCircles, makeBlobs, makeMoons };
