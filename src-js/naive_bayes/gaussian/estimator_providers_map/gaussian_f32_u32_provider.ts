import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixF32, GaussianNBF32U32, GaussianNBParameters } from '../../../core-bindings/index.js'
import { type IGaussianNBBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setGaussianNBParametersValues } from './index.js'
import { yAsUint32Array } from '../../../utilities/index.js'

class GaussianNBF32U32Provider
  implements PredictorProvider<IGaussianNBBaseParameters, GaussianNBParameters, GaussianNBF32U32>
{
  parameters(config: IGaussianNBBaseParameters): GaussianNBParameters {
    const parameters = new GaussianNBParameters()
    setGaussianNBParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: GaussianNBParameters): GaussianNBF32U32 {
    const xAsF32 = x.asRsMatrix('f32') as DenseMatrixF32
    const yAsUint32 = yAsUint32Array(y)
    return GaussianNBF32U32.fit(xAsF32, yAsUint32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): GaussianNBF32U32 {
    return GaussianNBF32U32.deserialize(data)
  }
}

export default GaussianNBF32U32Provider
