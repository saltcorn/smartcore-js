import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixF64, LinearRegressionF64F64, LinearRegressionParameters } from '../../../core-bindings/index.js'
import { type ILinearRegressionBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setLinearRegressionParametersValues } from './index.js'
import { yAsFloat64Array } from '../../../utilities/index.js'

class LinearRegressionF64F64Provider
  implements PredictorProvider<ILinearRegressionBaseParameters, LinearRegressionParameters, LinearRegressionF64F64>
{
  parameters(config: ILinearRegressionBaseParameters): LinearRegressionParameters {
    const parameters = new LinearRegressionParameters()
    setLinearRegressionParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: LinearRegressionParameters): LinearRegressionF64F64 {
    const xAsF64 = x.asRsMatrix('f64') as DenseMatrixF64
    const yAsF64 = yAsFloat64Array(y)
    return LinearRegressionF64F64.fit(xAsF64, yAsF64, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): LinearRegressionF64F64 {
    return LinearRegressionF64F64.deserialize(data)
  }
}

export default LinearRegressionF64F64Provider
