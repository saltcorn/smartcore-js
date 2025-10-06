import { GaussianNBF64BigU64, GaussianNBParameters } from '../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
import type { YType } from '../index.js';
import { BasePredictor } from '../base_predictor.js';
import { type YTypeKey } from '../base_estimator.js';
type GaussianNBRs = GaussianNBF64BigU64;
type GaussianNBParametersRs = GaussianNBParameters;
interface IGaussianNBParameters {
    priors?: Float64Array;
}
interface GaussianNBSerializedData {
    columns: string[] | null;
    data: Buffer;
    params: IGaussianNBParameters;
    yType: YTypeKey;
}
declare class GaussianNB extends BasePredictor<GaussianNBRs, GaussianNBParametersRs, YType> {
    static readonly className = "GaussianNB";
    readonly name: string;
    readonly config: IGaussianNBParameters;
    private estimatorClasses;
    constructor(params?: IGaussianNBParameters);
    protected fitEstimator(matrix: DenseMatrix, y: YType): GaussianNBRs;
    protected getComponentColumnName(index: number): string;
    predictMatrix(matrix: DenseMatrix): YType;
    serialize(): GaussianNBSerializedData;
    static deserialize(data: GaussianNBSerializedData): GaussianNB;
}
export default GaussianNB;
