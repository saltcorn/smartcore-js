import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixU64, BernoulliNBU64U32, BernoulliNBU64Parameters } from '../../../core-bindings/index.js'
import { type IBernoulliNBBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setBernoulliNBParametersValues } from './index.js'
import { yAsUint32Array } from '../../../utilities/index.js'

class BernoulliNBU64U32Provider
  implements PredictorProvider<IBernoulliNBBaseParameters, BernoulliNBU64Parameters, BernoulliNBU64U32>
{
  parameters(config: IBernoulliNBBaseParameters): BernoulliNBU64Parameters {
    const parameters = new BernoulliNBU64Parameters()
    setBernoulliNBParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: BernoulliNBU64Parameters): BernoulliNBU64U32 {
    const xAsU64 = x.asRsMatrix('u64') as DenseMatrixU64
    const yAsUint32 = yAsUint32Array(y)
    return BernoulliNBU64U32.fit(xAsU64, yAsUint32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('u64')
  }

  deserialize(data: Buffer): BernoulliNBU64U32 {
    return BernoulliNBU64U32.deserialize(data)
  }
}

export default BernoulliNBU64U32Provider
