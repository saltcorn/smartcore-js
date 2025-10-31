import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixF64, LassoF64F32, LassoParameters } from '../../../core-bindings/index.js'
import { type ILassoBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setLassoParametersValues } from './index.js'
import { yAsFloat32Array } from '../../../utilities/index.js'

class LassoF64F32Provider implements PredictorProvider<ILassoBaseParameters, LassoParameters, LassoF64F32> {
  parameters(config: ILassoBaseParameters): LassoParameters {
    const parameters = new LassoParameters()
    setLassoParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: LassoParameters): LassoF64F32 {
    const xAsF64 = x.asRsMatrix('f64') as DenseMatrixF64
    const yAsF32 = yAsFloat32Array(y)
    return LassoF64F32.fit(xAsF64, yAsF32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): LassoF64F32 {
    return LassoF64F32.deserialize(data)
  }
}

export default LassoF64F32Provider
