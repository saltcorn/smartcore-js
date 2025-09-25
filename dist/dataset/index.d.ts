import { DatasetF64I64, type DatasetF64F64 } from '../../core-bindings/index.js';
import type { YType } from '../index.js';
import { DenseMatrix } from '../linalg/index.js';
type DatasetRs = DatasetF64F64 | DatasetF64I64;
declare class Dataset {
    inner: DatasetRs;
    constructor(inner: DatasetRs);
}
interface LoadParams {
    returnXY?: boolean;
}
declare function loadIris(params?: LoadParams): Dataset | [DenseMatrix, YType];
declare function loadBoston(params?: LoadParams): Dataset | [DenseMatrix, YType];
declare function loadBreastCancer(params?: LoadParams): Dataset | [DenseMatrix, YType];
declare function loadDiabetes(params?: LoadParams): Dataset | [DenseMatrix, YType];
declare function loadDigits(params?: LoadParams): Dataset | [DenseMatrix, YType];
export { loadIris, loadBoston, loadBreastCancer, loadDiabetes, loadDigits };
