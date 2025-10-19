import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixF32, LassoF32I64, LassoParameters } from '../../../core-bindings/index.js'
import { type ILassoBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setLassoParametersValues } from './index.js'
import { yAsInt64Array } from '../../../utilities/index.js'

class LassoF32I64Provider implements PredictorProvider<ILassoBaseParameters, LassoParameters, LassoF32I64> {
  parameters(config: ILassoBaseParameters): LassoParameters {
    const parameters = new LassoParameters()
    setLassoParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: LassoParameters): LassoF32I64 {
    const xAsF32 = x.asRsMatrix('f32') as DenseMatrixF32
    const yAsI64 = yAsInt64Array(y)
    return LassoF32I64.fit(xAsF32, yAsI64, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): LassoF32I64 {
    return LassoF32I64.deserialize(data)
  }
}

export default LassoF32I64Provider
