import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixU8, BernoulliNBU8U64, BernoulliNBU8Parameters } from '../../../core-bindings/index.js'
import { type IBernoulliNBBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setBernoulliNBParametersValues } from './index.js'
import { yAsUint64Array } from '../../../utilities/index.js'

class BernoulliNBU8U64Provider
  implements PredictorProvider<IBernoulliNBBaseParameters, BernoulliNBU8Parameters, BernoulliNBU8U64>
{
  parameters(config: IBernoulliNBBaseParameters): BernoulliNBU8Parameters {
    const parameters = new BernoulliNBU8Parameters()
    setBernoulliNBParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: BernoulliNBU8Parameters): BernoulliNBU8U64 {
    const xAsU8 = x.asRsMatrix('u8') as DenseMatrixU8
    const yAsUint64 = yAsUint64Array(y)
    return BernoulliNBU8U64.fit(xAsU8, yAsUint64, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): BernoulliNBU8U64 {
    return BernoulliNBU8U64.deserialize(data)
  }
}

export default BernoulliNBU8U64Provider
