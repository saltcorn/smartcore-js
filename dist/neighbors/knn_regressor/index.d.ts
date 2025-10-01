import { type KNNAlgorithmName, type KNNWeightFunction } from '../../../core-bindings/index.js';
import type { XType, YType } from '../../index.js';
import { DistanceType } from '../../metrics/index.js';
import type { Estimator, Predictor } from '../../pipeline/index.js';
interface IKNNRegressorParameters {
    k?: number;
    algorithm?: KNNAlgorithmName;
    weight?: KNNWeightFunction;
    distance?: DistanceType;
    p?: number;
    data?: XType;
}
type YTypeKey = 'bigI64' | 'bigU64' | 'i64' | 'f64';
declare class KNNRegressor implements Estimator<XType, YType, KNNRegressor>, Predictor<XType, YType> {
    private estimator;
    constructor(params?: IKNNRegressorParameters);
    fit(x: XType, y: YType): KNNRegressor;
    predict(x: XType): YType;
    serialize(): {
        params: import("../../../core-bindings/index.js").KNNRegressorF64EuclidianF64Parameters;
        estimatorKey: YTypeKey | null;
        model: any;
    } | {
        params: import("../../../core-bindings/index.js").KNNRegressorF64HammingF64Parameters;
        estimatorKey: YTypeKey | null;
        model: any;
    } | {
        params: import("../../../core-bindings/index.js").KNNRegressorF64MahalanobisF64Parameters;
        estimatorKey: YTypeKey | null;
        model: any;
    } | {
        params: import("../../../core-bindings/index.js").KNNRegressorF64ManhattanF64Parameters;
        estimatorKey: YTypeKey | null;
        model: any;
    } | {
        params: import("../../../core-bindings/index.js").KNNRegressorF64MinkowskiF64Parameters;
        estimatorKey: YTypeKey | null;
        model: any;
    };
    deserialize(data: Buffer, yType: YTypeKey): KNNRegressor;
}
export { KNNRegressor, type IKNNRegressorParameters, type YTypeKey };
