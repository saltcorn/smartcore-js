import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixU32, BernoulliNBU32U64, BernoulliNBU32Parameters } from '../../../core-bindings/index.js'
import { type IBernoulliNBBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setBernoulliNBParametersValues } from './index.js'
import { yAsUint64Array } from '../../../utilities/index.js'

class BernoulliNBU32U64Provider
  implements PredictorProvider<IBernoulliNBBaseParameters, BernoulliNBU32Parameters, BernoulliNBU32U64>
{
  parameters(config: IBernoulliNBBaseParameters): BernoulliNBU32Parameters {
    const parameters = new BernoulliNBU32Parameters()
    setBernoulliNBParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: BernoulliNBU32Parameters): BernoulliNBU32U64 {
    const xAsU32 = x.asRsMatrix('u32') as DenseMatrixU32
    const yAsUint64 = yAsUint64Array(y)
    return BernoulliNBU32U64.fit(xAsU32, yAsUint64, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): BernoulliNBU32U64 {
    return BernoulliNBU32U64.deserialize(data)
  }
}

export default BernoulliNBU32U64Provider
