import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js';
import { KMeansU64I64, KMeansParameters } from '../../../core-bindings/index.js';
import { type IKMeansBaseParameters } from '../parameters.js';
import { type PredictorProvider } from '../../../estimator.js';
declare class KMeansU64U64Provider implements PredictorProvider<IKMeansBaseParameters, KMeansParameters, KMeansU64I64> {
    parameters(config: IKMeansBaseParameters): KMeansParameters;
    estimator(x: InputType, _y: YType, parameters: KMeansParameters): KMeansU64I64;
    toMatrix(x: InputType): DenseMatrixRs;
    deserialize(data: Buffer): KMeansU64I64;
}
export default KMeansU64U64Provider;
