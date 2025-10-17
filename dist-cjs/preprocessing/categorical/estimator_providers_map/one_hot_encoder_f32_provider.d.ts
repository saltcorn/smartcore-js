import { type DenseMatrixRs, type YType } from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { OneHotEncoderF32, OneHotEncoderParameters } from '../../../core-bindings/index.js';
import { type IOneHotEncoderBaseParameters } from '../index.js';
import { type TransformerProvider } from '../../../estimator.js';
declare class OneHotEncoderF32Provider implements TransformerProvider<IOneHotEncoderBaseParameters, OneHotEncoderParameters, OneHotEncoderF32> {
    parameters(config: IOneHotEncoderBaseParameters): OneHotEncoderParameters;
    estimator(x: DenseMatrix, _y: YType, parameters: OneHotEncoderParameters): OneHotEncoderF32;
    toMatrix(x: DenseMatrix): DenseMatrixRs;
    deserialize(data: Buffer): OneHotEncoderF32;
}
export default OneHotEncoderF32Provider;
