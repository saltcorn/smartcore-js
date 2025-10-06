import { KMeansF64BigI64, KMeansF64I64, KMeansParameters, KMeansF64F64 } from '../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
import type { YType } from '../index.js';
import type { YTypeKey } from '../base_estimator.js';
import { BasePredictor } from '../base_predictor.js';
interface IKMeansParameters {
    maxIter?: number;
    k?: number;
}
type KMeansRs = KMeansF64I64 | KMeansF64BigI64 | KMeansF64F64;
type KMeansParametersRs = KMeansParameters;
interface KMeansSerializedData {
    columns: string[] | null;
    data: Buffer;
    params: IKMeansParameters;
    yType: YTypeKey;
}
declare class KMeans extends BasePredictor<KMeansRs, KMeansParametersRs, YType> {
    static readonly className = "KMeans";
    readonly name: string;
    readonly config: IKMeansParameters;
    private estimatorClasses;
    constructor(params?: IKMeansParameters);
    protected fitEstimator(matrix: DenseMatrix, y: YType): KMeansRs;
    protected getComponentColumnName(index: number): string;
    predictMatrix(matrix: DenseMatrix): YType;
    serialize(): KMeansSerializedData;
    static deserialize(data: KMeansSerializedData): KMeans;
}
export { KMeans };
