import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { GaussianNBF64U32, GaussianNBParameters, DenseMatrixF64 } from '../../../core-bindings/index.js'
import { type IGaussianNBBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setGaussianNBParametersValues } from './index.js'
import { yAsUint32Array } from '../../../utilities/index.js'

class GaussianNBF64U32Provider
  implements PredictorProvider<IGaussianNBBaseParameters, GaussianNBParameters, GaussianNBF64U32>
{
  parameters(config: IGaussianNBBaseParameters): GaussianNBParameters {
    const parameters = new GaussianNBParameters()
    setGaussianNBParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: GaussianNBParameters): GaussianNBF64U32 {
    const xAsF64 = x.asRsMatrix('f64') as DenseMatrixF64
    const yAsUint32 = yAsUint32Array(y)
    return GaussianNBF64U32.fit(xAsF64, yAsUint32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f64')
  }

  deserialize(data: Buffer): GaussianNBF64U32 {
    return GaussianNBF64U32.deserialize(data)
  }
}

export default GaussianNBF64U32Provider
