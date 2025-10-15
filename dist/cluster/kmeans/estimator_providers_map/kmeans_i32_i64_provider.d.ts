import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js';
import { KMeansI32I64, KMeansParameters } from '../../../core-bindings/index.js';
import { type IKMeansBaseParameters } from '../parameters.js';
import { type PredictorProvider } from '../../../estimator.js';
declare class KMeansI32I32Provider implements PredictorProvider<IKMeansBaseParameters, KMeansParameters, KMeansI32I64> {
    parameters(config: IKMeansBaseParameters): KMeansParameters;
    estimator(x: InputType, _y: YType, parameters: KMeansParameters): KMeansI32I64;
    toMatrix(x: InputType): DenseMatrixRs;
    deserialize(data: Buffer): KMeansI32I64;
}
export default KMeansI32I32Provider;
