import { ElasticNetF64I64, ElasticNetParameters, ElasticNetF64F64, ElasticNetF64BigI64, ElasticNetF64BigU64 } from '../../core-bindings/index.js';
import type { XType, YType } from '../index.js';
import type { Estimator, Predictor } from '../pipeline/index.js';
type ElasticNetRs = ElasticNetF64I64 | ElasticNetF64F64 | ElasticNetF64BigI64 | ElasticNetF64BigU64;
interface IElasticNetParameters {
    alpha?: number;
    normalize?: boolean;
    tol?: number;
    maxIter?: number;
    l1Ratio?: number;
}
declare enum EstimatorType {
    F64BigU64 = 0,
    F64BigI64 = 1,
    F64I64 = 2,
    F64F64 = 3
}
declare class ElasticNet implements Estimator<XType, YType, ElasticNet>, Predictor<XType, YType> {
    parameters: ElasticNetParameters;
    estimator: ElasticNetRs | null;
    static readonly className = "ElasticNet";
    readonly name: string;
    constructor(params?: IElasticNetParameters);
    fit(x: XType, y: YType): ElasticNet;
    predict(x: XType): YType;
    serialize(): Buffer<ArrayBufferLike> | undefined;
    static deserialize(data: Buffer, estimatorType: EstimatorType): ElasticNet;
}
export default ElasticNet;
