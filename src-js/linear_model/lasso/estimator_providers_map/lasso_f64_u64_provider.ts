import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixF64, LassoF64U64, LassoParameters } from '../../../core-bindings/index.js'
import { type ILassoBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setLassoParametersValues } from './index.js'
import { yAsUint64Array } from '../../../utilities/index.js'

class LassoF64U64Provider implements PredictorProvider<ILassoBaseParameters, LassoParameters, LassoF64U64> {
  parameters(config: ILassoBaseParameters): LassoParameters {
    const parameters = new LassoParameters()
    setLassoParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: LassoParameters): LassoF64U64 {
    const xAsF64 = x.asRsMatrix('f64') as DenseMatrixF64
    const yAsU64 = yAsUint64Array(y)
    return LassoF64U64.fit(xAsF64, yAsU64, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): LassoF64U64 {
    return LassoF64U64.deserialize(data)
  }
}

export default LassoF64U64Provider
