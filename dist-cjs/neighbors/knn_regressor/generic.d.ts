import { type YType, type XType } from '../../index.js';
import { type YTypeKey } from './index.js';
interface EstimatorClass {
    fit(matrix: any, y: any, params: any): any;
    deserialize(data: Buffer): any;
}
declare class GenericKNNRegressor<TParams> {
    private params;
    private estimator;
    private estimatorKey;
    private estimatorClasses;
    constructor(params: TParams, estimatorClasses: Record<YTypeKey, EstimatorClass>);
    setEstimator(estimator: EstimatorClass): void;
    fit(x: XType, y: YType): this;
    predict(x: XType): YType;
    serialize(): {
        params: TParams;
        estimatorKey: YTypeKey | null;
        model: any;
    };
    deserialize(data: Buffer, estimatorKey: YTypeKey): void;
}
export { GenericKNNRegressor, type EstimatorClass };
