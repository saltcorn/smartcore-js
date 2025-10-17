import { type DenseMatrixRs, type YType } from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { KMeansF64I32, KMeansParameters } from '../../../core-bindings/index.js';
import { type IKMeansBaseParameters } from '../parameters.js';
import { type PredictorProvider } from '../../../estimator.js';
declare class KMeansF64F64Provider implements PredictorProvider<IKMeansBaseParameters, KMeansParameters, KMeansF64I32> {
    parameters(config: IKMeansBaseParameters): KMeansParameters;
    estimator(x: DenseMatrix, _y: YType, parameters: KMeansParameters): KMeansF64I32;
    toMatrix(x: DenseMatrix): DenseMatrixRs;
    deserialize(data: Buffer): KMeansF64I32;
}
export default KMeansF64F64Provider;
