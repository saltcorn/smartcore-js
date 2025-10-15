import { type InputType, type YType } from '../../index.js';
import { type IKMeansBaseParameters, type NumberTypeRs } from './parameters.js';
import { type PredictOutputType } from './estimator_providers_map/index.js';
interface IKMeansParameters extends IKMeansBaseParameters {
    targetType?: NumberTypeRs;
    predictOutputType?: PredictOutputType;
}
interface KMeansSerializedData {
    config: IKMeansParameters;
    data: Buffer;
}
declare class KMeans {
    static readonly className = "KMeans";
    readonly name: string;
    readonly config: IKMeansParameters;
    private _isFitted;
    private estimatorProvider;
    private parameters;
    private estimator;
    constructor(params?: IKMeansParameters);
    fit(x: InputType, y: YType): this;
    protected getComponentColumnName(index: number): string;
    protected ensureFitted(methodName: string): void;
    predict(matrix: InputType): YType;
    serialize(): KMeansSerializedData;
    private _deserialize;
    static deserialize(data: KMeansSerializedData): KMeans;
}
export { KMeans };
