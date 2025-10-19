import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { BernoulliNBI32U32, BernoulliNBF64Parameters, DenseMatrixI32 } from '../../../core-bindings/index.js'
import { type IBernoulliNBBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setBernoulliNBParametersValues } from './index.js'
import { yAsUint32Array } from '../../../utilities/index.js'

class BernoulliNBI32U32Provider
  implements PredictorProvider<IBernoulliNBBaseParameters, BernoulliNBF64Parameters, BernoulliNBI32U32>
{
  parameters(config: IBernoulliNBBaseParameters): BernoulliNBF64Parameters {
    const parameters = new BernoulliNBF64Parameters()
    setBernoulliNBParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: BernoulliNBF64Parameters): BernoulliNBI32U32 {
    const xAsI32 = x.asRsMatrix('i32') as DenseMatrixI32
    const yAsUint32 = yAsUint32Array(y)
    return BernoulliNBI32U32.fit(xAsI32, yAsUint32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): BernoulliNBI32U32 {
    return BernoulliNBI32U32.deserialize(data)
  }
}

export default BernoulliNBI32U32Provider
