import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixF32, OneHotEncoderF32, OneHotEncoderParameters } from '../../../core-bindings/index.js'
import { type IOneHotEncoderBaseParameters } from '../index.js'
import { type TransformerProvider } from '../../../estimator.js'
import { normalizeCategoricalParams } from './index.js'

class OneHotEncoderF32Provider
  implements TransformerProvider<IOneHotEncoderBaseParameters, OneHotEncoderParameters, OneHotEncoderF32>
{
  parameters(config: IOneHotEncoderBaseParameters): OneHotEncoderParameters {
    let categoricalParams = normalizeCategoricalParams(config.categoricalParams)
    const parameters = new OneHotEncoderParameters(categoricalParams)
    return parameters
  }

  estimator(x: DenseMatrix, _y: YType, parameters: OneHotEncoderParameters): OneHotEncoderF32 {
    const xAsF32 = x.asRsMatrix('f32') as DenseMatrixF32
    return OneHotEncoderF32.fit(xAsF32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): OneHotEncoderF32 {
    return OneHotEncoderF32.deserialize(data)
  }
}

export default OneHotEncoderF32Provider
