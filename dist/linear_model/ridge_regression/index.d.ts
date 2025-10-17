import { type InputType, type YType } from '../../index.js';
import { type IRidgeRegressionBaseParameters } from './estimator_providers_map/index.js';
type NumberTypeRs = 'f32' | 'f64';
interface IRidgeRegressionParameters extends IRidgeRegressionBaseParameters {
    featureType?: NumberTypeRs;
    targetType?: NumberTypeRs;
    columns?: string[];
}
interface RidgeRegressionSerializedData {
    config: IRidgeRegressionParameters;
    data: Buffer;
}
interface HasColumns {
    columns: string[] | null;
}
declare class RidgeRegression implements HasColumns {
    static readonly className = "RidgeRegression";
    readonly name: string;
    readonly config: IRidgeRegressionParameters;
    private _isFitted;
    private estimatorProvider;
    private parameters;
    private estimator;
    constructor(params?: IRidgeRegressionParameters);
    get columns(): string[] | null;
    fit(x: InputType, y: YType): this;
    protected getComponentColumnName(index: number): string;
    protected ensureFitted(methodName: string): void;
    predict(x: InputType): YType;
    serialize(): RidgeRegressionSerializedData;
    private _deserialize;
    static deserialize(data: RidgeRegressionSerializedData): RidgeRegression;
}
export { RidgeRegression, type IRidgeRegressionBaseParameters, type NumberTypeRs };
