import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixF32, RidgeRegressionF32F32, RidgeRegressionF32Parameters } from '../../../core-bindings/index.js'
import { type IRidgeRegressionBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setRidgeRegressionParametersValues } from './index.js'
import { yAsFloat32Array } from '../../../utilities/index.js'

class RidgeRegressionF32F32Provider
  implements PredictorProvider<IRidgeRegressionBaseParameters, RidgeRegressionF32Parameters, RidgeRegressionF32F32>
{
  parameters(config: IRidgeRegressionBaseParameters): RidgeRegressionF32Parameters {
    const parameters = new RidgeRegressionF32Parameters()
    setRidgeRegressionParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: RidgeRegressionF32Parameters): RidgeRegressionF32F32 {
    const xAsF32 = x.asRsMatrix('f32') as DenseMatrixF32
    const yAsF32 = yAsFloat32Array(y)
    return RidgeRegressionF32F32.fit(xAsF32, yAsF32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): RidgeRegressionF32F32 {
    return RidgeRegressionF32F32.deserialize(data)
  }
}

export default RidgeRegressionF32F32Provider
