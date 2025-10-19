import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixU64, BernoulliNBU64U64, BernoulliNBU64Parameters } from '../../../core-bindings/index.js'
import { type IBernoulliNBBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setBernoulliNBParametersValues } from './index.js'
import { yAsUint64Array } from '../../../utilities/index.js'

class BernoulliNBU64U64Provider
  implements PredictorProvider<IBernoulliNBBaseParameters, BernoulliNBU64Parameters, BernoulliNBU64U64>
{
  parameters(config: IBernoulliNBBaseParameters): BernoulliNBU64Parameters {
    const parameters = new BernoulliNBU64Parameters()
    setBernoulliNBParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: BernoulliNBU64Parameters): BernoulliNBU64U64 {
    const xAsU64 = x.asRsMatrix('u64') as DenseMatrixU64
    const yAsUint64 = yAsUint64Array(y)
    return BernoulliNBU64U64.fit(xAsU64, yAsUint64, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): BernoulliNBU64U64 {
    return BernoulliNBU64U64.deserialize(data)
  }
}

export default BernoulliNBU64U64Provider
