import { type KNNAlgorithmName, type KNNWeightFunction } from '../../core-bindings/index.js';
import type { XType, YType } from '../../index.js';
import { DistanceType } from '../../metrics/index.js';
import type { Estimator, Predictor } from '../../pipeline/index.js';
interface IKNNClassifierParameters {
    k?: number;
    algorithm?: KNNAlgorithmName;
    weight?: KNNWeightFunction;
    distance?: DistanceType;
    p?: number;
    data?: XType;
}
type YTypeKey = 'bigI64' | 'bigU64' | 'i64';
declare class KNNClassifier implements Estimator<XType, YType, KNNClassifier>, Predictor<XType, YType> {
    private estimator;
    static readonly className = "KNNClassifier";
    readonly name: string;
    constructor(params?: IKNNClassifierParameters);
    fit(x: XType, y: YType): KNNClassifier;
    predict(x: XType): YType;
    serialize(): {
        params: import("../../core-bindings/index.js").KNNClassifierF64EuclidianF64Parameters;
        estimatorKey: YTypeKey | null;
        model: any;
    } | {
        params: import("../../core-bindings/index.js").KNNClassifierF64HammingF64Parameters;
        estimatorKey: YTypeKey | null;
        model: any;
    } | {
        params: import("../../core-bindings/index.js").KNNClassifierF64MahalanobisF64Parameters;
        estimatorKey: YTypeKey | null;
        model: any;
    } | {
        params: import("../../core-bindings/index.js").KNNClassifierF64ManhattanF64Parameters;
        estimatorKey: YTypeKey | null;
        model: any;
    } | {
        params: import("../../core-bindings/index.js").KNNClassifierF64MinkowskiF64Parameters;
        estimatorKey: YTypeKey | null;
        model: any;
    };
    deserialize(data: Buffer, yType: YTypeKey): KNNClassifier;
}
export { KNNClassifier, type IKNNClassifierParameters, type YTypeKey };
