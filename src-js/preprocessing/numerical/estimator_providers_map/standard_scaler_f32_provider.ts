import { type DenseMatrixRs } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixF32, StandardScalerF32, StandardScalerParameters } from '../../../core-bindings/index.js'
import { type IStandardScalerBaseParameters } from '../index.js'
import { type TransformerProvider } from '../../../estimator.js'

class StandardScalerF32Provider
  implements TransformerProvider<IStandardScalerBaseParameters, StandardScalerParameters, StandardScalerF32>
{
  parameters(_config: IStandardScalerBaseParameters): StandardScalerParameters {
    const parameters = new StandardScalerParameters()
    return parameters
  }

  estimator(x: DenseMatrix, _y: any, parameters: StandardScalerParameters): StandardScalerF32 {
    const xAsF32 = x.asRsMatrix('f32') as DenseMatrixF32
    return StandardScalerF32.fit(xAsF32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): StandardScalerF32 {
    return StandardScalerF32.deserialize(data)
  }
}

export default StandardScalerF32Provider
