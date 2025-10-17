import { type InputType, type YType } from '../../index.js';
import { type IDBSCANBaseParameters, type NumberTypeRs } from './parameters.js';
import { type DistanceType } from '../../metrics/index.js';
interface IDBSCANParameters extends IDBSCANBaseParameters {
    numberType?: NumberTypeRs;
    distanceType?: DistanceType;
}
interface DBSCANSerializedData {
    config: IDBSCANParameters;
    data: Buffer;
}
declare class DBSCAN {
    static readonly className = "DBSCAN";
    readonly name: string;
    readonly config: IDBSCANParameters;
    private _isFitted;
    private estimatorProvider;
    private parameters;
    private estimator;
    constructor(params?: IDBSCANParameters);
    fit(x: InputType, y: YType): this;
    protected getComponentColumnName(index: number): string;
    protected ensureFitted(methodName: string): void;
    predict(matrix: InputType): YType;
    serialize(): DBSCANSerializedData;
    private _deserialize;
    static deserialize(data: DBSCANSerializedData): DBSCAN;
}
export { DBSCAN };
