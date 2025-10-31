import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { RidgeRegressionF64F32, RidgeRegressionF32Parameters, DenseMatrixF64 } from '../../../core-bindings/index.js'
import { type IRidgeRegressionBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setRidgeRegressionParametersValues } from './index.js'
import { yAsFloat32Array } from '../../../utilities/index.js'

class RidgeRegressionF64F32Provider
  implements PredictorProvider<IRidgeRegressionBaseParameters, RidgeRegressionF32Parameters, RidgeRegressionF64F32>
{
  parameters(config: IRidgeRegressionBaseParameters): RidgeRegressionF32Parameters {
    const parameters = new RidgeRegressionF32Parameters()
    setRidgeRegressionParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: RidgeRegressionF32Parameters): RidgeRegressionF64F32 {
    const xAsF64 = x.asRsMatrix('f64') as DenseMatrixF64
    const yAsF32 = yAsFloat32Array(y)
    return RidgeRegressionF64F32.fit(xAsF64, yAsF32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): RidgeRegressionF64F32 {
    return RidgeRegressionF64F32.deserialize(data)
  }
}

export default RidgeRegressionF64F32Provider
