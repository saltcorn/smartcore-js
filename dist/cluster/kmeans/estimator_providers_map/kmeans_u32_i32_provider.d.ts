import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js';
import { KMeansU32I32, KMeansParameters } from '../../../core-bindings/index.js';
import { type IKMeansBaseParameters } from '../parameters.js';
import { type PredictorProvider } from '../../../estimator.js';
declare class KMeansU32U32Provider implements PredictorProvider<IKMeansBaseParameters, KMeansParameters, KMeansU32I32> {
    parameters(config: IKMeansBaseParameters): KMeansParameters;
    estimator(x: InputType, _y: YType, parameters: KMeansParameters): KMeansU32I32;
    toMatrix(x: InputType): DenseMatrixRs;
    deserialize(data: Buffer): KMeansU32I32;
}
export default KMeansU32U32Provider;
