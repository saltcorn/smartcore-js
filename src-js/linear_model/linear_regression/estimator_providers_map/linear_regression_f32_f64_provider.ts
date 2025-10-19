import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixF32, LinearRegressionF32F64, LinearRegressionParameters } from '../../../core-bindings/index.js'
import { type ILinearRegressionBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setLinearRegressionParametersValues } from './index.js'
import { yAsFloat64Array } from '../../../utilities/index.js'

class LinearRegressionF32F64Provider
  implements PredictorProvider<ILinearRegressionBaseParameters, LinearRegressionParameters, LinearRegressionF32F64>
{
  parameters(config: ILinearRegressionBaseParameters): LinearRegressionParameters {
    const parameters = new LinearRegressionParameters()
    setLinearRegressionParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: LinearRegressionParameters): LinearRegressionF32F64 {
    const xAsF32 = x.asRsMatrix('f32') as DenseMatrixF32
    const yAsF64 = yAsFloat64Array(y)
    return LinearRegressionF32F64.fit(xAsF32, yAsF64, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): LinearRegressionF32F64 {
    return LinearRegressionF32F64.deserialize(data)
  }
}

export default LinearRegressionF32F64Provider
