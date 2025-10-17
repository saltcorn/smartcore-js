import { type DenseMatrixRs, type YType } from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { KMeansI64I64, KMeansParameters } from '../../../core-bindings/index.js';
import { type IKMeansBaseParameters } from '../parameters.js';
import { type PredictorProvider } from '../../../estimator.js';
declare class KMeansI64I64Provider implements PredictorProvider<IKMeansBaseParameters, KMeansParameters, KMeansI64I64> {
    parameters(config: IKMeansBaseParameters): KMeansParameters;
    estimator(x: DenseMatrix, _y: YType, parameters: KMeansParameters): KMeansI64I64;
    toMatrix(x: DenseMatrix): DenseMatrixRs;
    deserialize(data: Buffer): KMeansI64I64;
}
export default KMeansI64I64Provider;
