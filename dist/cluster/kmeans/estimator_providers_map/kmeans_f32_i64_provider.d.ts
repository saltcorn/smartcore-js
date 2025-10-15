import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js';
import { KMeansF32I64, KMeansParameters } from '../../../core-bindings/index.js';
import { type IKMeansBaseParameters } from '../parameters.js';
import { type PredictorProvider } from '../../../estimator.js';
declare class KMeansF32F32Provider implements PredictorProvider<IKMeansBaseParameters, KMeansParameters, KMeansF32I64> {
    parameters(config: IKMeansBaseParameters): KMeansParameters;
    estimator(x: InputType, _y: YType, parameters: KMeansParameters): KMeansF32I64;
    toMatrix(x: InputType): DenseMatrixRs;
    deserialize(data: Buffer): KMeansF32I64;
}
export default KMeansF32F32Provider;
