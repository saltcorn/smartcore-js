import { CategoricalNBBigU64, CategoricalNBParameters } from '../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
import type { YType } from '../index.js';
import { BasePredictor } from '../base_predictor.js';
import { type YTypeKey } from '../base_estimator.js';
type CategoricalNBRs = CategoricalNBBigU64;
type CategoricalNBParametersRs = CategoricalNBParameters;
interface ICategoricalNBParameters {
    alpha?: number;
}
interface CategoricalNBSerializedData {
    columns: string[] | null;
    data: Buffer;
    params: ICategoricalNBParameters;
    yType: YTypeKey;
}
declare class CategoricalNB extends BasePredictor<CategoricalNBRs, CategoricalNBParametersRs, YType> {
    static readonly className = "CategoricalNB";
    readonly name: string;
    readonly config: ICategoricalNBParameters;
    private estimatorClasses;
    constructor(params?: ICategoricalNBParameters);
    protected fitEstimator(matrix: DenseMatrix, y: YType): CategoricalNBRs;
    protected getComponentColumnName(index: number): string;
    predictMatrix(matrix: DenseMatrix): YType;
    serialize(): CategoricalNBSerializedData;
    static deserialize(data: CategoricalNBSerializedData): CategoricalNB;
}
export default CategoricalNB;
