import { DenseMatrixF64, DenseMatrixI64, DenseMatrixU64 } from '../../../core-bindings/index.js';
type DenseMatrixRs = DenseMatrixF64 | DenseMatrixI64 | DenseMatrixU64;
declare class DenseMatrix {
    private inner;
    private _ncols;
    private _nrows;
    constructor(data: number[][] | DenseMatrixRs, columnMajor?: boolean | undefined);
    get ncols(): number;
    get nrows(): number;
    private static prepData;
    get matrix(): DenseMatrixRs;
    static f64(data: number[][], columnMajor?: boolean | undefined): DenseMatrix;
    static u64(data: number[][], columnMajor?: boolean | undefined): DenseMatrix;
    asF64(): DenseMatrixF64;
    asU64(): DenseMatrixU64;
    asI64(): DenseMatrixI64;
}
export default DenseMatrix;
