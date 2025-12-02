import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixU16, BernoulliNBU16U32, BernoulliNBU16Parameters } from '../../../core-bindings/index.js'
import { type IBernoulliNBBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setBernoulliNBParametersValues } from './index.js'
import { yAsUint32Array } from '../../../utilities/index.js'

class BernoulliNBU16U32Provider
  implements PredictorProvider<IBernoulliNBBaseParameters, BernoulliNBU16Parameters, BernoulliNBU16U32>
{
  parameters(config: IBernoulliNBBaseParameters): BernoulliNBU16Parameters {
    const parameters = new BernoulliNBU16Parameters()
    setBernoulliNBParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: BernoulliNBU16Parameters): BernoulliNBU16U32 {
    const xAsU16 = x.asRsMatrix('u16') as DenseMatrixU16
    const yAsUint32 = yAsUint32Array(y)
    return BernoulliNBU16U32.fit(xAsU16, yAsUint32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('u16')
  }

  deserialize(data: Buffer): BernoulliNBU16U32 {
    return BernoulliNBU16U32.deserialize(data)
  }
}

export default BernoulliNBU16U32Provider
