import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixU16, BernoulliNBU16U64, BernoulliNBU16Parameters } from '../../../core-bindings/index.js'
import { type IBernoulliNBBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setBernoulliNBParametersValues } from './index.js'
import { yAsUint64Array } from '../../../utilities/index.js'

class BernoulliNBU16U64Provider
  implements PredictorProvider<IBernoulliNBBaseParameters, BernoulliNBU16Parameters, BernoulliNBU16U64>
{
  parameters(config: IBernoulliNBBaseParameters): BernoulliNBU16Parameters {
    const parameters = new BernoulliNBU16Parameters()
    setBernoulliNBParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: BernoulliNBU16Parameters): BernoulliNBU16U64 {
    const xAsU16 = x.asRsMatrix('u16') as DenseMatrixU16
    const yAsUint64 = yAsUint64Array(y)
    return BernoulliNBU16U64.fit(xAsU16, yAsUint64, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): BernoulliNBU16U64 {
    return BernoulliNBU16U64.deserialize(data)
  }
}

export default BernoulliNBU16U64Provider
