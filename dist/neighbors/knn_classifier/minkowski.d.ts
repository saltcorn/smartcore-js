import { KNNClassifierF64MinkowskiF64Parameters } from '../../../core-bindings/index.js';
import type { XType, YType } from '../../index.js';
import type { Estimator, Predictor } from '../../pipeline/index.js';
import { type IKNNClassifierParameters, EstimatorType } from './index.js';
declare abstract class KNNClassifierStatics {
    private parameters;
    constructor(parameters?: IKNNClassifierParameters);
    get params(): KNNClassifierF64MinkowskiF64Parameters;
    initializeParameterValues(parameters?: IKNNClassifierParameters): void;
}
declare class KNNClassifierMinkowski extends KNNClassifierStatics implements Estimator<XType, YType, KNNClassifierMinkowski>, Predictor<XType, YType> {
    private estimator;
    constructor(params?: IKNNClassifierParameters);
    fit(x: XType, y: YType): KNNClassifierMinkowski;
    predict(x: XType): YType;
    serialize(): Buffer<ArrayBufferLike> | undefined;
    static deserialize(data: Buffer, estimatorType: EstimatorType): KNNClassifierMinkowski;
}
export { KNNClassifierMinkowski };
