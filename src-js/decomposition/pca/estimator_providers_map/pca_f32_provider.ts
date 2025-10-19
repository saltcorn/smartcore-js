import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixF32, PCAF32, PCAParameters } from '../../../core-bindings/index.js'
import { type IPCABaseParameters } from '../index.js'
import { type TransformerProvider } from '../../../estimator.js'
import { setPCAParametersValues } from './index.js'

class PCAF32Provider implements TransformerProvider<IPCABaseParameters, PCAParameters, PCAF32> {
  parameters(config: IPCABaseParameters): PCAParameters {
    const parameters = new PCAParameters()
    setPCAParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, _y: YType, parameters: PCAParameters): PCAF32 {
    const xAsF32 = x.asRsMatrix('f32') as DenseMatrixF32
    return PCAF32.fit(xAsF32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): PCAF32 {
    return PCAF32.deserialize(data)
  }
}

export default PCAF32Provider
