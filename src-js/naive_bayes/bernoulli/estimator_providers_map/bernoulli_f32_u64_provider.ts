import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixF32, BernoulliNBF32U64, BernoulliNBF32Parameters } from '../../../core-bindings/index.js'
import { type IBernoulliNBBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setBernoulliNBParametersValues } from './index.js'
import { yAsUint64Array } from '../../../utilities/index.js'

class BernoulliNBF32U64Provider
  implements PredictorProvider<IBernoulliNBBaseParameters, BernoulliNBF32Parameters, BernoulliNBF32U64>
{
  parameters(config: IBernoulliNBBaseParameters): BernoulliNBF32Parameters {
    const parameters = new BernoulliNBF32Parameters()
    setBernoulliNBParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: BernoulliNBF32Parameters): BernoulliNBF32U64 {
    const xAsF32 = x.asRsMatrix('f32') as DenseMatrixF32
    const yAsUint64 = yAsUint64Array(y)
    return BernoulliNBF32U64.fit(xAsF32, yAsUint64, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): BernoulliNBF32U64 {
    return BernoulliNBF32U64.deserialize(data)
  }
}

export default BernoulliNBF32U64Provider
