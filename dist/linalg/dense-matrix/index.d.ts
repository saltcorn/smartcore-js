import { DenseMatrixF64, DenseMatrixI64, DenseMatrixU64 } from '../../../core-bindings/index.js';
type DenseMatrixRs = DenseMatrixF64 | DenseMatrixI64 | DenseMatrixU64;
declare class DenseMatrix {
    private inner;
    constructor(data: number[][] | DenseMatrixRs, columnMajor?: boolean | undefined);
    private static prepData;
    get matrix(): DenseMatrixRs;
    static f64(data: number[][], columnMajor?: boolean | undefined): DenseMatrix;
    asF64(): DenseMatrixF64;
}
export default DenseMatrix;
