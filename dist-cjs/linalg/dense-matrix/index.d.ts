import { DenseMatrixF32, DenseMatrixF64, DenseMatrixI32, DenseMatrixI64, DenseMatrixU16, DenseMatrixU32, DenseMatrixU64, DenseMatrixU8 } from '../../core-bindings/index.js';
import * as converters from './converters.js';
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
    constructor(data: number[][] | DenseMatrixRs | bigint[][], params?: IDenseMatrixParams);
    get ncols(): number;
    get nrows(): number;
    private static prepData;
    get matrix(): DenseMatrixRs;
    static f64(data: (number | bigint)[][], columnMajor?: boolean): DenseMatrix;
    static f32(data: (number | bigint)[][], columnMajor?: boolean): DenseMatrix;
    static i32(data: (number | bigint)[][], columnMajor?: boolean): DenseMatrix;
    static u32(data: (number | bigint)[][], columnMajor?: boolean): DenseMatrix;
    static u8(data: (number | bigint)[][], columnMajor?: boolean): DenseMatrix;
    static u16(data: (number | bigint)[][], columnMajor?: boolean): DenseMatrix;
    static i64(data: (number | bigint)[][], columnMajor?: boolean): DenseMatrix;
    static u64(data: (number | bigint)[][], columnMajor?: boolean): DenseMatrix;
    asRsMatrix(dataType?: NumberTypeRs): DenseMatrixRs;
}
export { DenseMatrix, type DenseMatrixRs, type NumberTypeRs, converters };
