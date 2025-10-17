import { type DenseMatrixRs, type YType } from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { OneHotEncoderF64, OneHotEncoderParameters } from '../../../core-bindings/index.js';
import { type IOneHotEncoderBaseParameters } from '../index.js';
import { type TransformerProvider } from '../../../estimator.js';
declare class OneHotEncoderF64Provider implements TransformerProvider<IOneHotEncoderBaseParameters, OneHotEncoderParameters, OneHotEncoderF64> {
    parameters(config: IOneHotEncoderBaseParameters): OneHotEncoderParameters;
    estimator(x: DenseMatrix, _y: YType, parameters: OneHotEncoderParameters): OneHotEncoderF64;
    toMatrix(x: DenseMatrix): DenseMatrixRs;
    deserialize(data: Buffer): OneHotEncoderF64;
}
export default OneHotEncoderF64Provider;
