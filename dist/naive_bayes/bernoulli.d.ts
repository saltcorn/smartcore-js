import { BernoulliNBF64BigU64, BernoulliNBF64Parameters } from '../../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
import type { YType } from '../index.js';
import { BasePredictor } from '../base_predictor.js';
import { type YTypeKey } from '../base_estimator.js';
type BernoulliNBRs = BernoulliNBF64BigU64;
type BernoulliNBParametersRs = BernoulliNBF64Parameters;
interface IBernoulliNBParameters {
    priors?: Float64Array;
    alpha?: number;
    binarize?: number;
}
interface BernoulliNBSerializedData {
    columns: string[] | null;
    data: Buffer;
    params: IBernoulliNBParameters;
    yType: YTypeKey;
}
declare class BernoulliNB extends BasePredictor<BernoulliNBRs, BernoulliNBParametersRs, YType> {
    static readonly className = "BernoulliNB";
    readonly name: string;
    readonly config: IBernoulliNBParameters;
    private estimatorClasses;
    constructor(params?: IBernoulliNBParameters);
    protected fitEstimator(matrix: DenseMatrix, y: YType): BernoulliNBRs;
    protected getComponentColumnName(index: number): string;
    predictMatrix(matrix: DenseMatrix): YType;
    serialize(): BernoulliNBSerializedData;
    static deserialize(data: BernoulliNBSerializedData): BernoulliNB;
}
export default BernoulliNB;
