import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixF64, SVDF64, SVDParameters } from '../../../core-bindings/index.js'
import { type ISVDBaseParameters } from '../index.js'
import { type TransformerProvider } from '../../../estimator.js'
import { setSVDParametersValues } from './index.js'

class SVDF64Provider implements TransformerProvider<ISVDBaseParameters, SVDParameters, SVDF64> {
  parameters(config: ISVDBaseParameters): SVDParameters {
    const parameters = new SVDParameters()
    setSVDParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, _y: YType, parameters: SVDParameters): SVDF64 {
    const xAsF64 = x.asRsMatrix('f64') as DenseMatrixF64
    return SVDF64.fit(xAsF64, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f64')
  }

  deserialize(data: Buffer): SVDF64 {
    return SVDF64.deserialize(data)
  }
}

export default SVDF64Provider
