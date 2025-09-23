import { DenseMatrixF64, DenseMatrixI64, DenseMatrixU64 } from '../../../core-bindings/index.js';
type DenseMatrixRs = DenseMatrixF64 | DenseMatrixI64 | DenseMatrixU64;
declare class DenseMatrix {
    inner: DenseMatrixRs;
    constructor(data: number[][] | DenseMatrixRs, columnMajor?: boolean | undefined);
    private static prepData;
    static f64(data: number[][], columnMajor?: boolean | undefined): DenseMatrix;
}
export default DenseMatrix;
