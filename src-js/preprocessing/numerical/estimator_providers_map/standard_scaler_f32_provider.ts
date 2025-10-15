import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js'
import { converters } from '../../../linalg/dense-matrix/index.js'
import { StandardScalerF32, StandardScalerParameters } from '../../../core-bindings/index.js'
import { type IStandardScalerBaseParameters } from '../index.js'
import { type TransformerProvider } from '../../../estimator.js'

class StandardScalerF32Provider
  implements TransformerProvider<IStandardScalerBaseParameters, StandardScalerParameters, StandardScalerF32>
{
  parameters(_config: IStandardScalerBaseParameters): StandardScalerParameters {
    const parameters = new StandardScalerParameters()
    return parameters
  }

  estimator(x: InputType, _y: YType, parameters: StandardScalerParameters): StandardScalerF32 {
    const xAsF32 = converters.toDenseMatrixF32(x)
    return StandardScalerF32.fit(xAsF32, parameters)
  }

  toMatrix(x: InputType): DenseMatrixRs {
    return converters.toDenseMatrixF32(x)
  }

  deserialize(data: Buffer): StandardScalerF32 {
    return StandardScalerF32.deserialize(data)
  }
}

export default StandardScalerF32Provider
