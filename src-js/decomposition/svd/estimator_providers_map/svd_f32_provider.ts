import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixF32, SVDF32, SVDParameters } from '../../../core-bindings/index.js'
import { type ISVDBaseParameters } from '../index.js'
import { type TransformerProvider } from '../../../estimator.js'
import { setSVDParametersValues } from './index.js'

class SVDF32Provider implements TransformerProvider<ISVDBaseParameters, SVDParameters, SVDF32> {
  parameters(config: ISVDBaseParameters): SVDParameters {
    const parameters = new SVDParameters()
    setSVDParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, _y: YType, parameters: SVDParameters): SVDF32 {
    const xAsF32 = x.asRsMatrix('f32') as DenseMatrixF32
    return SVDF32.fit(xAsF32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): SVDF32 {
    return SVDF32.deserialize(data)
  }
}

export default SVDF32Provider
