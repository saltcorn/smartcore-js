import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixF64, GaussianNBF64U64, GaussianNBParameters } from '../../../core-bindings/index.js'
import { type IGaussianNBBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setGaussianNBParametersValues } from './index.js'
import { yAsUint64Array } from '../../../utilities/index.js'

class GaussianNBF64U64Provider
  implements PredictorProvider<IGaussianNBBaseParameters, GaussianNBParameters, GaussianNBF64U64>
{
  parameters(config: IGaussianNBBaseParameters): GaussianNBParameters {
    const parameters = new GaussianNBParameters()
    setGaussianNBParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: GaussianNBParameters): GaussianNBF64U64 {
    const xAsF64 = x.asRsMatrix('f64') as DenseMatrixF64
    const yAsUint64 = yAsUint64Array(y)
    return GaussianNBF64U64.fit(xAsF64, yAsUint64, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f64')
  }

  deserialize(data: Buffer): GaussianNBF64U64 {
    return GaussianNBF64U64.deserialize(data)
  }
}

export default GaussianNBF64U64Provider
