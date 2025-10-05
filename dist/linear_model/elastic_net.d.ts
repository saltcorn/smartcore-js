import { ElasticNetF64I64, ElasticNetParameters, ElasticNetF64F64, ElasticNetF64BigI64, ElasticNetF64BigU64 } from '../../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
import type { YType } from '../index.js';
import { BasePredictor } from '../base_predictor.js';
import { type YTypeKey } from '../base_estimator.js';
type ElasticNetRs = ElasticNetF64I64 | ElasticNetF64F64 | ElasticNetF64BigI64 | ElasticNetF64BigU64;
type ElasticNetParametersRs = ElasticNetParameters;
interface IElasticNetParameters {
    alpha?: number;
    normalize?: boolean;
    tol?: number;
    maxIter?: number;
    l1Ratio?: number;
}
interface ElasticNetSerializedData {
    columns: string[] | null;
    data: Buffer;
    params: IElasticNetParameters;
    yType: YTypeKey;
}
declare class ElasticNet extends BasePredictor<ElasticNetRs, ElasticNetParametersRs, YType> {
    static readonly className = "ElasticNet";
    readonly name: string;
    readonly config: IElasticNetParameters;
    private estimatorClasses;
    constructor(params?: IElasticNetParameters);
    protected fitEstimator(matrix: DenseMatrix, y: YType): ElasticNetRs;
    protected getComponentColumnName(index: number): string;
    predictMatrix(matrix: DenseMatrix): YType;
    serialize(): ElasticNetSerializedData;
    static deserialize(data: ElasticNetSerializedData): ElasticNet;
}
export default ElasticNet;
