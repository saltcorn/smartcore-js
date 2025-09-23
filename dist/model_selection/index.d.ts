import { DenseMatrix } from '../linalg/index.js';
interface TrainTestSplitParams {
    testSize: number;
    shuffle?: boolean;
    seed?: bigint;
}
declare function trainTestSplit(x: DenseMatrix | number[][], y: number[] | BigInt64Array, params: TrainTestSplitParams): [import("../../core-bindings/index.js").DenseMatrixF64, import("../../core-bindings/index.js").DenseMatrixF64, Float64Array<ArrayBufferLike>, Float64Array<ArrayBufferLike>] | [import("../../core-bindings/index.js").DenseMatrixF64, import("../../core-bindings/index.js").DenseMatrixF64, BigInt64Array<ArrayBufferLike>, BigInt64Array<ArrayBufferLike>];
export { trainTestSplit };
