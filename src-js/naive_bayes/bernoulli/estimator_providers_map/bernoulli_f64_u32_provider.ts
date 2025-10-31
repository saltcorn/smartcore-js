import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { BernoulliNBF64U32, BernoulliNBF64Parameters, DenseMatrixF64 } from '../../../core-bindings/index.js'
import { type IBernoulliNBBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setBernoulliNBParametersValues } from './index.js'
import { yAsUint32Array } from '../../../utilities/index.js'

class BernoulliNBF64U32Provider
  implements PredictorProvider<IBernoulliNBBaseParameters, BernoulliNBF64Parameters, BernoulliNBF64U32>
{
  parameters(config: IBernoulliNBBaseParameters): BernoulliNBF64Parameters {
    const parameters = new BernoulliNBF64Parameters()
    setBernoulliNBParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: BernoulliNBF64Parameters): BernoulliNBF64U32 {
    const xAsF64 = x.asRsMatrix('f64') as DenseMatrixF64
    const yAsUint32 = yAsUint32Array(y)
    return BernoulliNBF64U32.fit(xAsF64, yAsUint32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f64')
  }

  deserialize(data: Buffer): BernoulliNBF64U32 {
    return BernoulliNBF64U32.deserialize(data)
  }
}

export default BernoulliNBF64U32Provider
