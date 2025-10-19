import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixF32, LinearRegressionF32F32, LinearRegressionParameters } from '../../../core-bindings/index.js'
import { type ILinearRegressionBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setLinearRegressionParametersValues } from './index.js'
import { yAsFloat32Array } from '../../../utilities/index.js'

class LinearRegressionF32F32Provider
  implements PredictorProvider<ILinearRegressionBaseParameters, LinearRegressionParameters, LinearRegressionF32F32>
{
  parameters(config: ILinearRegressionBaseParameters): LinearRegressionParameters {
    const parameters = new LinearRegressionParameters()
    setLinearRegressionParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: LinearRegressionParameters): LinearRegressionF32F32 {
    const xAsF32 = x.asRsMatrix('f32') as DenseMatrixF32
    const yAsF32 = yAsFloat32Array(y)
    return LinearRegressionF32F32.fit(xAsF32, yAsF32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): LinearRegressionF32F32 {
    return LinearRegressionF32F32.deserialize(data)
  }
}

export default LinearRegressionF32F32Provider
