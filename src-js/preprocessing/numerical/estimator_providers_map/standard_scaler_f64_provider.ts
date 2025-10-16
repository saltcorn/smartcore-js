import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixF64, StandardScalerF64, StandardScalerParameters } from '../../../core-bindings/index.js'
import { type IStandardScalerBaseParameters } from '../index.js'
import { type TransformerProvider } from '../../../estimator.js'

class StandardScalerF64Provider
  implements TransformerProvider<IStandardScalerBaseParameters, StandardScalerParameters, StandardScalerF64>
{
  parameters(_config: IStandardScalerBaseParameters): StandardScalerParameters {
    const parameters = new StandardScalerParameters()
    return parameters
  }

  estimator(x: InputType, _y: YType, parameters: StandardScalerParameters): StandardScalerF64 {
    const xAsF64 = (x as DenseMatrix).asRsMatrix('f64') as DenseMatrixF64
    return StandardScalerF64.fit(xAsF64, parameters)
  }

  toMatrix(x: InputType): DenseMatrixRs {
    return (x as DenseMatrix).asRsMatrix('f64')
  }

  deserialize(data: Buffer): StandardScalerF64 {
    return StandardScalerF64.deserialize(data)
  }
}

export default StandardScalerF64Provider
