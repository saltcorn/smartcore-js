import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixF64, OneHotEncoderF64, OneHotEncoderParameters } from '../../../core-bindings/index.js'
import { type IOneHotEncoderBaseParameters } from '../index.js'
import { type TransformerProvider } from '../../../estimator.js'
import { normalizeCategoricalParams } from './index.js'

class OneHotEncoderF64Provider
  implements TransformerProvider<IOneHotEncoderBaseParameters, OneHotEncoderParameters, OneHotEncoderF64>
{
  parameters(config: IOneHotEncoderBaseParameters): OneHotEncoderParameters {
    let categoricalParams = normalizeCategoricalParams(config.categoricalParams)
    const parameters = new OneHotEncoderParameters(categoricalParams)
    return parameters
  }

  estimator(x: DenseMatrix, _y: YType, parameters: OneHotEncoderParameters): OneHotEncoderF64 {
    const xAsF64 = x.asRsMatrix('f64') as DenseMatrixF64
    return OneHotEncoderF64.fit(xAsF64, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f64')
  }

  deserialize(data: Buffer): OneHotEncoderF64 {
    return OneHotEncoderF64.deserialize(data)
  }
}

export default OneHotEncoderF64Provider
