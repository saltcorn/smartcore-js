import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixF64,
  LogisticRegressionF64I64,
  LogisticRegressionParametersF64,
} from '../../../core-bindings/index.js'
import { type ILogisticRegressionBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setLogisticRegressionParametersValues } from './index.js'
import { yAsInt64Array } from '../../../utilities/index.js'

class LogisticRegressionF64I64Provider
  implements
    PredictorProvider<ILogisticRegressionBaseParameters, LogisticRegressionParametersF64, LogisticRegressionF64I64>
{
  parameters(config: ILogisticRegressionBaseParameters): LogisticRegressionParametersF64 {
    const parameters = new LogisticRegressionParametersF64()
    setLogisticRegressionParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: LogisticRegressionParametersF64): LogisticRegressionF64I64 {
    const xAsF64 = x.asRsMatrix('f64') as DenseMatrixF64
    const yAsI64 = yAsInt64Array(y)
    return LogisticRegressionF64I64.fit(xAsF64, yAsI64, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): LogisticRegressionF64I64 {
    return LogisticRegressionF64I64.deserialize(data)
  }
}

export default LogisticRegressionF64I64Provider
