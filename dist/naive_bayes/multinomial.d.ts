import { MultinomialNBU64BigU64, MultinomialNBParameters } from '../../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
import type { YType } from '../index.js';
import { BasePredictor } from '../base_predictor.js';
import { type YTypeKey } from '../base_estimator.js';
type MultinomialNBRs = MultinomialNBU64BigU64;
type MultinomialNBParametersRs = MultinomialNBParameters;
interface IMultinomialNBParameters {
    priors?: Float64Array;
    alpha?: number;
}
interface MultinomialNBSerializedData {
    columns: string[] | null;
    data: Buffer;
    params: IMultinomialNBParameters;
    yType: YTypeKey;
}
declare class MultinomialNB extends BasePredictor<MultinomialNBRs, MultinomialNBParametersRs, YType> {
    static readonly className = "MultinomialNB";
    readonly name: string;
    readonly config: IMultinomialNBParameters;
    private estimatorClasses;
    constructor(params?: IMultinomialNBParameters);
    protected fitEstimator(matrix: DenseMatrix, y: YType): MultinomialNBRs;
    protected getComponentColumnName(index: number): string;
    predictMatrix(matrix: DenseMatrix): YType;
    serialize(): MultinomialNBSerializedData;
    static deserialize(data: MultinomialNBSerializedData): MultinomialNB;
}
export default MultinomialNB;
