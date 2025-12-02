import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixF32, BernoulliNBF32U32, BernoulliNBF32Parameters } from '../../../core-bindings/index.js'
import { type IBernoulliNBBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setBernoulliNBParametersValues } from './index.js'
import { yAsUint32Array } from '../../../utilities/index.js'

class BernoulliNBF32U32Provider
  implements PredictorProvider<IBernoulliNBBaseParameters, BernoulliNBF32Parameters, BernoulliNBF32U32>
{
  parameters(config: IBernoulliNBBaseParameters): BernoulliNBF32Parameters {
    const parameters = new BernoulliNBF32Parameters()
    setBernoulliNBParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: BernoulliNBF32Parameters): BernoulliNBF32U32 {
    const xAsF32 = x.asRsMatrix('f32') as DenseMatrixF32
    const yAsUint32 = yAsUint32Array(y)
    return BernoulliNBF32U32.fit(xAsF32, yAsUint32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): BernoulliNBF32U32 {
    return BernoulliNBF32U32.deserialize(data)
  }
}

export default BernoulliNBF32U32Provider
