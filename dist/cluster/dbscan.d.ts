import { EuclidianF64, HammingF64, MahalanobisF64, ManhattanF64, MinkowskiF64 } from '../../core-bindings/index.js';
import { type KNNAlgorithmName } from '../../core-bindings/index.js';
import type { XType, YType } from '../index.js';
import type { Estimator, Predictor } from '../pipeline/index.js';
type DistanceRs = EuclidianF64 | HammingF64 | MahalanobisF64 | ManhattanF64 | MinkowskiF64;
interface DBSCANParams {
    minSamples?: number;
    algorithm?: KNNAlgorithmName;
    eps?: number;
    distance?: DistanceRs;
}
declare class DBSCAN implements Estimator<XType, YType, DBSCAN>, Predictor<XType, YType> {
    private parameters;
    private estimator;
    static readonly className = "DBSCAN";
    readonly name: string;
    constructor(params?: DBSCANParams);
    fit(x: XType, y: YType): DBSCAN;
    predict(x: XType): YType;
    serialize(): Buffer<ArrayBufferLike> | undefined;
    static deserialize(data: Buffer): DBSCAN;
}
export { DBSCAN };
