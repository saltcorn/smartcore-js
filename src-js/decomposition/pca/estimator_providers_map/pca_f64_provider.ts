import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixF64, PCAF64, PCAParameters } from '../../../core-bindings/index.js'
import { type IPCABaseParameters } from '../index.js'
import { type TransformerProvider } from '../../../estimator.js'
import { setPCAParametersValues } from './index.js'

class PCAF64Provider implements TransformerProvider<IPCABaseParameters, PCAParameters, PCAF64> {
  parameters(config: IPCABaseParameters): PCAParameters {
    const parameters = new PCAParameters()
    setPCAParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, _y: YType, parameters: PCAParameters): PCAF64 {
    const xAsF64 = x.asRsMatrix('f64') as DenseMatrixF64
    return PCAF64.fit(xAsF64, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f64')
  }

  deserialize(data: Buffer): PCAF64 {
    return PCAF64.deserialize(data)
  }
}

export default PCAF64Provider
