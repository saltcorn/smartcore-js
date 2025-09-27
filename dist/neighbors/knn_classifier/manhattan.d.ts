import { KNNClassifierF64ManhattanF64Parameters } from '../../../core-bindings/index.js';
import type { XType, YType } from '../../index.js';
import type { Estimator, Predictor } from '../../pipeline/index.js';
import { type IKNNClassifierParameters } from './index.js';
declare enum EstimatorType {
    F64I64 = 0,
    F64BigI64 = 1,
    F64BigU64 = 2
}
declare abstract class KNNClassifierStatics {
    private parameters;
    constructor();
    get params(): KNNClassifierF64ManhattanF64Parameters;
    initializeParameterValues(parameters?: IKNNClassifierParameters): void;
}
declare class KNNClassifierManhattan extends KNNClassifierStatics implements Estimator<XType, YType, KNNClassifierManhattan>, Predictor<XType, YType> {
    private estimator;
    constructor(params?: IKNNClassifierParameters);
    fit(x: XType, y: YType): KNNClassifierManhattan;
    predict(x: XType): YType;
    serialize(): Buffer<ArrayBufferLike> | undefined;
    static deserialize(data: Buffer, estimatorType: EstimatorType): KNNClassifierManhattan;
}
export { KNNClassifierManhattan };
