import { KNNRegressorF64EuclidianF64Parameters } from '../../../core-bindings/index.js';
import type { XType, YType } from '../../index.js';
import type { Estimator, Predictor } from '../../pipeline/index.js';
import { type IKNNRegressorParameters, EstimatorType } from './index.js';
declare abstract class KNNRegressorStatics {
    private parameters;
    constructor();
    get params(): KNNRegressorF64EuclidianF64Parameters;
    initializeParameterValues(parameters?: IKNNRegressorParameters): void;
}
declare class KNNRegressorEuclidian extends KNNRegressorStatics implements Estimator<XType, YType, KNNRegressorEuclidian>, Predictor<XType, YType> {
    private estimator;
    constructor(params?: IKNNRegressorParameters);
    fit(x: XType, y: YType): KNNRegressorEuclidian;
    predict(x: XType): YType;
    serialize(): Buffer<ArrayBufferLike> | undefined;
    static deserialize(data: Buffer, estimatorType: EstimatorType): KNNRegressorEuclidian;
}
export { KNNRegressorEuclidian };
