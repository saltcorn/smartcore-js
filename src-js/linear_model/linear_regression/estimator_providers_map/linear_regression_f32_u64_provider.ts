import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixF32, LinearRegressionF32U64, LinearRegressionParameters } from '../../../core-bindings/index.js'
import { type ILinearRegressionBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setLinearRegressionParametersValues } from './index.js'
import { yAsUint64Array } from '../../../utilities/index.js'

class LinearRegressionF32U64Provider
  implements PredictorProvider<ILinearRegressionBaseParameters, LinearRegressionParameters, LinearRegressionF32U64>
{
  parameters(config: ILinearRegressionBaseParameters): LinearRegressionParameters {
    const parameters = new LinearRegressionParameters()
    setLinearRegressionParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: LinearRegressionParameters): LinearRegressionF32U64 {
    const xAsF32 = x.asRsMatrix('f32') as DenseMatrixF32
    const yAsU64 = yAsUint64Array(y)
    return LinearRegressionF32U64.fit(xAsF32, yAsU64, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): LinearRegressionF32U64 {
    return LinearRegressionF32U64.deserialize(data)
  }
}

export default LinearRegressionF32U64Provider
