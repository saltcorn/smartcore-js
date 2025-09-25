import { DenseMatrix } from '../linalg/index.js';
interface TrainTestSplitParams {
    testSize: number;
    shuffle?: boolean;
    seed?: bigint;
}
declare function trainTestSplit(x: DenseMatrix | number[][], y: number[] | BigInt64Array, params: TrainTestSplitParams): [DenseMatrix, DenseMatrix, BigInt64Array | Float64Array, BigInt64Array | Float64Array];
export { trainTestSplit };
