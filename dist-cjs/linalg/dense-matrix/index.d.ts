import { DenseMatrixF32, DenseMatrixF64, DenseMatrixI32, DenseMatrixI64, DenseMatrixU16, DenseMatrixU32, DenseMatrixU64, DenseMatrixU8 } from '../../core-bindings/index.js';
type DenseMatrixRs = DenseMatrixF64 | DenseMatrixF32 | DenseMatrixI32 | DenseMatrixU32 | DenseMatrixU8 | DenseMatrixU16 | DenseMatrixI64 | DenseMatrixU64;
type NumberTypeRs = 'f32' | 'f64' | 'u32' | 'i32' | 'i64' | 'u16' | 'u8' | 'u64';
interface IDenseMatrixParams {
    columnMajor?: boolean;
    numberType?: NumberTypeRs;
}
declare class DenseMatrix {
    private inner;
    private _ncols;
    private _nrows;
    private _largestNo;
    private _smallestNo;
    private _hasFloat;
    constructor(data: (number | bigint)[][] | DenseMatrixRs, params?: IDenseMatrixParams);
    get numberType(): NumberTypeRs;
    get ncols(): number;
    get nrows(): number;
    asRsMatrix(dataType?: NumberTypeRs): DenseMatrixRs;
}
export { DenseMatrix, type DenseMatrixRs, type NumberTypeRs };
