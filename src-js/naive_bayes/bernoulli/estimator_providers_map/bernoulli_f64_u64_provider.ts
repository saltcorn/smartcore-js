import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixF64, BernoulliNBF64U64, BernoulliNBF64Parameters } from '../../../core-bindings/index.js'
import { type IBernoulliNBBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setBernoulliNBParametersValues } from './index.js'
import { yAsUint64Array } from '../../../utilities/index.js'

class BernoulliNBF64U64Provider
  implements PredictorProvider<IBernoulliNBBaseParameters, BernoulliNBF64Parameters, BernoulliNBF64U64>
{
  parameters(config: IBernoulliNBBaseParameters): BernoulliNBF64Parameters {
    const parameters = new BernoulliNBF64Parameters()
    setBernoulliNBParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: BernoulliNBF64Parameters): BernoulliNBF64U64 {
    const xAsF64 = x.asRsMatrix('f64') as DenseMatrixF64
    const yAsUint64 = yAsUint64Array(y)
    return BernoulliNBF64U64.fit(xAsF64, yAsUint64, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f64')
  }

  deserialize(data: Buffer): BernoulliNBF64U64 {
    return BernoulliNBF64U64.deserialize(data)
  }
}

export default BernoulliNBF64U64Provider
