import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixI64, BernoulliNBI64U64, BernoulliNBI64Parameters } from '../../../core-bindings/index.js'
import { type IBernoulliNBBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setBernoulliNBParametersValues } from './index.js'
import { yAsUint64Array } from '../../../utilities/index.js'

class BernoulliNBI64U64Provider
  implements PredictorProvider<IBernoulliNBBaseParameters, BernoulliNBI64Parameters, BernoulliNBI64U64>
{
  parameters(config: IBernoulliNBBaseParameters): BernoulliNBI64Parameters {
    const parameters = new BernoulliNBI64Parameters()
    setBernoulliNBParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: BernoulliNBI64Parameters): BernoulliNBI64U64 {
    const xAsI64 = x.asRsMatrix('i64') as DenseMatrixI64
    const yAsUint64 = yAsUint64Array(y)
    return BernoulliNBI64U64.fit(xAsI64, yAsUint64, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('i64')
  }

  deserialize(data: Buffer): BernoulliNBI64U64 {
    return BernoulliNBI64U64.deserialize(data)
  }
}

export default BernoulliNBI64U64Provider
