import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixF32, LassoF32U64, LassoParameters } from '../../../core-bindings/index.js'
import { type ILassoBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setLassoParametersValues } from './index.js'
import { yAsUint64Array } from '../../../utilities/index.js'

class LassoF32U64Provider implements PredictorProvider<ILassoBaseParameters, LassoParameters, LassoF32U64> {
  parameters(config: ILassoBaseParameters): LassoParameters {
    const parameters = new LassoParameters()
    setLassoParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: LassoParameters): LassoF32U64 {
    const xAsF32 = x.asRsMatrix('f32') as DenseMatrixF32
    const yAsU64 = yAsUint64Array(y)
    return LassoF32U64.fit(xAsF32, yAsU64, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): LassoF32U64 {
    return LassoF32U64.deserialize(data)
  }
}

export default LassoF32U64Provider
