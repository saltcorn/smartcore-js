import { type DenseMatrixRs, type YType } from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { KMeansU32I64, KMeansParameters } from '../../../core-bindings/index.js';
import { type IKMeansBaseParameters } from '../parameters.js';
import { type PredictorProvider } from '../../../estimator.js';
declare class KMeansU32U32Provider implements PredictorProvider<IKMeansBaseParameters, KMeansParameters, KMeansU32I64> {
    parameters(config: IKMeansBaseParameters): KMeansParameters;
    estimator(x: DenseMatrix, _y: YType, parameters: KMeansParameters): KMeansU32I64;
    toMatrix(x: DenseMatrix): DenseMatrixRs;
    deserialize(data: Buffer): KMeansU32I64;
}
export default KMeansU32U32Provider;
