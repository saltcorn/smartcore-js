import { KNNRegressorF64MahalanobisF64Parameters } from '../../../core-bindings/index.js';
import type { XType, YType } from '../../index.js';
import type { Estimator, Predictor } from '../../pipeline/index.js';
import { type IKNNRegressorParameters, EstimatorType } from './index.js';
declare abstract class KNNRegressorStatics {
    private parameters;
    constructor(parameters?: IKNNRegressorParameters);
    get params(): KNNRegressorF64MahalanobisF64Parameters;
    initializeParameterValues(parameters?: IKNNRegressorParameters): void;
}
declare class KNNRegressorMahalanobis extends KNNRegressorStatics implements Estimator<XType, YType, KNNRegressorMahalanobis>, Predictor<XType, YType> {
    private estimator;
    constructor(params?: IKNNRegressorParameters);
    fit(x: XType, y: YType): KNNRegressorMahalanobis;
    predict(x: XType): YType;
    serialize(): Buffer<ArrayBufferLike> | undefined;
    static deserialize(data: Buffer, estimatorType: EstimatorType): KNNRegressorMahalanobis;
}
export { KNNRegressorMahalanobis };
