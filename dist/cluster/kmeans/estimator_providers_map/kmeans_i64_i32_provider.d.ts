import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js';
import { KMeansI64I32, KMeansParameters } from '../../../core-bindings/index.js';
import { type IKMeansBaseParameters } from '../parameters.js';
import { type PredictorProvider } from '../../../estimator.js';
declare class KMeansI64I64Provider implements PredictorProvider<IKMeansBaseParameters, KMeansParameters, KMeansI64I32> {
    parameters(config: IKMeansBaseParameters): KMeansParameters;
    estimator(x: InputType, _y: YType, parameters: KMeansParameters): KMeansI64I32;
    toMatrix(x: InputType): DenseMatrixRs;
    deserialize(data: Buffer): KMeansI64I32;
}
export default KMeansI64I64Provider;
