import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixU8, BernoulliNBU8U32, BernoulliNBU8Parameters } from '../../../core-bindings/index.js'
import { type IBernoulliNBBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setBernoulliNBParametersValues } from './index.js'
import { yAsUint32Array } from '../../../utilities/index.js'

class BernoulliNBU8U32Provider
  implements PredictorProvider<IBernoulliNBBaseParameters, BernoulliNBU8Parameters, BernoulliNBU8U32>
{
  parameters(config: IBernoulliNBBaseParameters): BernoulliNBU8Parameters {
    const parameters = new BernoulliNBU8Parameters()
    setBernoulliNBParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: BernoulliNBU8Parameters): BernoulliNBU8U32 {
    const xAsU8 = x.asRsMatrix('u8') as DenseMatrixU8
    const yAsUint32 = yAsUint32Array(y)
    return BernoulliNBU8U32.fit(xAsU8, yAsUint32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): BernoulliNBU8U32 {
    return BernoulliNBU8U32.deserialize(data)
  }
}

export default BernoulliNBU8U32Provider
