import { type DenseMatrixRs, type YType } from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { StandardScalerF64, StandardScalerParameters } from '../../../core-bindings/index.js';
import { type IStandardScalerBaseParameters } from '../index.js';
import { type TransformerProvider } from '../../../estimator.js';
declare class StandardScalerF64Provider implements TransformerProvider<IStandardScalerBaseParameters, StandardScalerParameters, StandardScalerF64> {
    parameters(_config: IStandardScalerBaseParameters): StandardScalerParameters;
    estimator(x: DenseMatrix, _y: YType, parameters: StandardScalerParameters): StandardScalerF64;
    toMatrix(x: DenseMatrix): DenseMatrixRs;
    deserialize(data: Buffer): StandardScalerF64;
}
export default StandardScalerF64Provider;
