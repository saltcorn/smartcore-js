import type { YType } from '../../index.js';
import { BasePredictor } from '../../base_predictor.js';
import { type YTypeKey } from '../../base_estimator.js';
import { DenseMatrix } from '../../linalg/index.js';
import { type DistanceKey, type DBSCANParametersRs, type DBSCANRs, type IDBSCANParameters } from './parameters.js';
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
    static defaultDistanceKey(): DistanceKey;
    get distanceKey(): DistanceKey;
    protected fitEstimator(matrix: DenseMatrix, _y: YType): DBSCANRs;
    protected getComponentColumnName(index: number): string;
    predictMatrix(matrix: DenseMatrix): YType;
    serialize(): DBSCANSerializedData;
    static deserialize(data: DBSCANSerializedData): DBSCAN;
}
export { DBSCAN };
