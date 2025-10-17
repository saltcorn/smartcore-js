import { type DenseMatrixRs, type YType } from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { StandardScalerF32, StandardScalerParameters } from '../../../core-bindings/index.js';
import { type IStandardScalerBaseParameters } from '../index.js';
import { type TransformerProvider } from '../../../estimator.js';
declare class StandardScalerF32Provider implements TransformerProvider<IStandardScalerBaseParameters, StandardScalerParameters, StandardScalerF32> {
    parameters(_config: IStandardScalerBaseParameters): StandardScalerParameters;
    estimator(x: DenseMatrix, _y: YType, parameters: StandardScalerParameters): StandardScalerF32;
    toMatrix(x: DenseMatrix): DenseMatrixRs;
    deserialize(data: Buffer): StandardScalerF32;
}
export default StandardScalerF32Provider;
