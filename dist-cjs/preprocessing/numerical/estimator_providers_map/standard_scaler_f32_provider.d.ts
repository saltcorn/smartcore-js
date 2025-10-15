import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js';
import { StandardScalerF32, StandardScalerParameters } from '../../../core-bindings/index.js';
import { type IStandardScalerBaseParameters } from '../index.js';
import { type TransformerProvider } from '../../../estimator.js';
declare class StandardScalerF32Provider implements TransformerProvider<IStandardScalerBaseParameters, StandardScalerParameters, StandardScalerF32> {
    parameters(_config: IStandardScalerBaseParameters): StandardScalerParameters;
    estimator(x: InputType, _y: YType, parameters: StandardScalerParameters): StandardScalerF32;
    toMatrix(x: InputType): DenseMatrixRs;
    deserialize(data: Buffer): StandardScalerF32;
}
export default StandardScalerF32Provider;
