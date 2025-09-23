import { DenseMatrixF64, DenseMatrixI64, DenseMatrixU64 } from '../../../core-bindings/index.js';
declare class DenseMatrix {
    inner: DenseMatrixF64 | DenseMatrixI64 | DenseMatrixU64;
    constructor(data: number[][], columnMajor?: boolean | undefined | null);
}
export default DenseMatrix;
