import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixF32, LassoF32I32, LassoParameters } from '../../../core-bindings/index.js'
import { type ILassoBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setLassoParametersValues } from './index.js'
import { yAsInt32Array } from '../../../utilities/index.js'

class LassoF32I32Provider implements PredictorProvider<ILassoBaseParameters, LassoParameters, LassoF32I32> {
  parameters(config: ILassoBaseParameters): LassoParameters {
    const parameters = new LassoParameters()
    setLassoParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: LassoParameters): LassoF32I32 {
    const xAsF32 = x.asRsMatrix('f32') as DenseMatrixF32
    const yAsI32 = yAsInt32Array(y)
    return LassoF32I32.fit(xAsF32, yAsI32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): LassoF32I32 {
    return LassoF32I32.deserialize(data)
  }
}

export default LassoF32I32Provider
