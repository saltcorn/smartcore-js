import { KNNClassifierF64EuclidianF64Parameters } from '../../../core-bindings/index.js';
import type { XType, YType } from '../../index.js';
import type { Estimator, Predictor } from '../../pipeline/index.js';
import { type IKNNClassifierParameters, EstimatorType } from './index.js';
declare abstract class KNNClassifierStatics {
    private parameters;
    constructor();
    get params(): KNNClassifierF64EuclidianF64Parameters;
    initializeParameterValues(parameters?: IKNNClassifierParameters): void;
}
declare class KNNClassifierEuclidian extends KNNClassifierStatics implements Estimator<XType, YType, KNNClassifierEuclidian>, Predictor<XType, YType> {
    private estimator;
    constructor(params?: IKNNClassifierParameters);
    fit(x: XType, y: YType): KNNClassifierEuclidian;
    predict(x: XType): YType;
    serialize(): Buffer<ArrayBufferLike> | undefined;
    static deserialize(data: Buffer, estimatorType: EstimatorType): KNNClassifierEuclidian;
}
export { KNNClassifierEuclidian };
