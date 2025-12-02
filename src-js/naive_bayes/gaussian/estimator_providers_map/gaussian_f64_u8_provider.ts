import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { GaussianNBF64U8, GaussianNBParameters, DenseMatrixF64 } from '../../../core-bindings/index.js'
import { type IGaussianNBBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setGaussianNBParametersValues } from './index.js'
import { yAsUint8Array } from '../../../utilities/index.js'

class GaussianNBF64U8Provider
  implements PredictorProvider<IGaussianNBBaseParameters, GaussianNBParameters, GaussianNBF64U8>
{
  parameters(config: IGaussianNBBaseParameters): GaussianNBParameters {
    const parameters = new GaussianNBParameters()
    setGaussianNBParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: GaussianNBParameters): GaussianNBF64U8 {
    const xAsF64 = x.asRsMatrix('f64') as DenseMatrixF64
    const yAsUint8 = yAsUint8Array(y)
    return GaussianNBF64U8.fit(xAsF64, yAsUint8, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f64')
  }

  deserialize(data: Buffer): GaussianNBF64U8 {
    return GaussianNBF64U8.deserialize(data)
  }
}

export default GaussianNBF64U8Provider
