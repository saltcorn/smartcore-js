import { DBSCANF64EuclidianF64Parameters, DBSCANF64F64EuclidianF64, EuclidianF64, HammingF64, MahalanobisF64, ManhattanF64, MinkowskiF64 } from '../../core-bindings/index.js';
import { DBSCANF64HammingF64Parameters, DBSCANF64MahalanobisF64Parameters, DBSCANF64ManhattanF64Parameters, DBSCANF64MinkowskiF64Parameters, type KNNAlgorithmName } from '../../core-bindings/index.js';
import type { YType } from '../index.js';
import { BasePredictor } from '../base_predictor.js';
import { type YTypeKey } from '../base_estimator.js';
import { DenseMatrix } from '../linalg/index.js';
type DistanceRs = EuclidianF64 | HammingF64 | MahalanobisF64 | ManhattanF64 | MinkowskiF64;
type DistanceKey = 'EuclidianF64' | 'HammingF64' | 'MahalanobisF64' | 'ManhattanF64' | 'MinkowskiF64';
interface IDBSCANParameters {
    minSamples?: number;
    algorithm?: KNNAlgorithmName;
    eps?: number;
    distance?: DistanceRs;
}
type DBSCANRs = DBSCANF64F64EuclidianF64;
type DBSCANParametersRs = DBSCANF64EuclidianF64Parameters | DBSCANF64HammingF64Parameters | DBSCANF64MahalanobisF64Parameters | DBSCANF64ManhattanF64Parameters | DBSCANF64MinkowskiF64Parameters;
interface DBSCANSerializedData {
    columns: string[] | null;
    data: Buffer;
    params: IDBSCANParameters;
    yType: YTypeKey;
}
declare class DBSCAN extends BasePredictor<DBSCANRs, DBSCANParametersRs, YType> {
    static readonly className = "DBSCAN";
    readonly name: string;
    readonly config: IDBSCANParameters;
    private estimatorClasses;
    constructor(params?: IDBSCANParameters);
    get distanceKey(): DistanceKey;
    static getDistanceKey(distance: any): DistanceKey;
    protected fitEstimator(matrix: DenseMatrix, _y: YType): DBSCANRs;
    protected getComponentColumnName(index: number): string;
    predictMatrix(matrix: DenseMatrix): YType;
    serialize(): DBSCANSerializedData;
    static deserialize(data: DBSCANSerializedData): DBSCAN;
}
export { DBSCAN };
