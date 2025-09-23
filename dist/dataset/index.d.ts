import { DatasetF64I64, type DatasetF64F64 } from '../../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
type DatasetRs = DatasetF64F64 | DatasetF64I64;
declare class Dataset {
    inner: DatasetRs;
    constructor(inner: DatasetRs);
}
interface LoadIrisParams {
    returnXY?: boolean;
}
declare function loadIris(params?: LoadIrisParams): Dataset | [DenseMatrix, number[] | BigInt64Array];
export { loadIris };
