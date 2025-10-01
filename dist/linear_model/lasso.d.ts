import { LassoF64I64, LassoParameters, LassoF64F64, LassoF64BigI64, LassoF64BigU64 } from '../../core-bindings/index.js';
import type { XType, YType } from '../index.js';
import type { Estimator, Predictor } from '../pipeline/index.js';
type LassoRs = LassoF64I64 | LassoF64F64 | LassoF64BigI64 | LassoF64BigU64;
interface ILassoParameters {
    alpha?: number;
    normalize?: boolean;
    tol?: number;
    maxIter?: number;
}
declare enum EstimatorType {
    F64BigI64 = 0,
    F64BigU64 = 1,
    F64I64 = 2,
    F64F64 = 3
}
declare class Lasso implements Estimator<XType, YType, Lasso>, Predictor<XType, YType> {
    parameters: LassoParameters;
    estimator: LassoRs | null;
    static readonly className = "Lasso";
    readonly name: string;
    constructor(params?: ILassoParameters);
    fit(x: XType, y: YType): Lasso;
    predict(x: XType): YType;
    serialize(): Buffer<ArrayBufferLike> | undefined;
    static deserialize(data: Buffer, estimatorType: EstimatorType): Lasso;
}
export default Lasso;
