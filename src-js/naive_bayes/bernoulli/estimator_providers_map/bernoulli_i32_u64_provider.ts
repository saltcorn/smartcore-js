import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixI32, BernoulliNBI32U64, BernoulliNBF64Parameters } from '../../../core-bindings/index.js'
import { type IBernoulliNBBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setBernoulliNBParametersValues } from './index.js'
import { yAsUint64Array } from '../../../utilities/index.js'

class BernoulliNBI32U64Provider
  implements PredictorProvider<IBernoulliNBBaseParameters, BernoulliNBF64Parameters, BernoulliNBI32U64>
{
  parameters(config: IBernoulliNBBaseParameters): BernoulliNBF64Parameters {
    const parameters = new BernoulliNBF64Parameters()
    setBernoulliNBParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: BernoulliNBF64Parameters): BernoulliNBI32U64 {
    const xAsI32 = x.asRsMatrix('i32') as DenseMatrixI32
    const yAsUint64 = yAsUint64Array(y)
    return BernoulliNBI32U64.fit(xAsI32, yAsUint64, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): BernoulliNBI32U64 {
    return BernoulliNBI32U64.deserialize(data)
  }
}

export default BernoulliNBI32U64Provider
