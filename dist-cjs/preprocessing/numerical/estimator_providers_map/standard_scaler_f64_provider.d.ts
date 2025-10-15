import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js';
import { StandardScalerF64, StandardScalerParameters } from '../../../core-bindings/index.js';
import { type IStandardScalerBaseParameters } from '../index.js';
import { type TransformerProvider } from '../../../estimator.js';
declare class StandardScalerF64Provider implements TransformerProvider<IStandardScalerBaseParameters, StandardScalerParameters, StandardScalerF64> {
    parameters(_config: IStandardScalerBaseParameters): StandardScalerParameters;
    estimator(x: InputType, _y: YType, parameters: StandardScalerParameters): StandardScalerF64;
    toMatrix(x: InputType): DenseMatrixRs;
    deserialize(data: Buffer): StandardScalerF64;
}
export default StandardScalerF64Provider;
