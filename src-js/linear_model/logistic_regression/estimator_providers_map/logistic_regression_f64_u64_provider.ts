import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixF64,
  LogisticRegressionF64U64,
  LogisticRegressionParametersF64,
} from '../../../core-bindings/index.js'
import { type ILogisticRegressionBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setLogisticRegressionParametersValues } from './index.js'
import { yAsUint64Array } from '../../../utilities/index.js'

class LogisticRegressionF64U64Provider
  implements
    PredictorProvider<ILogisticRegressionBaseParameters, LogisticRegressionParametersF64, LogisticRegressionF64U64>
{
  parameters(config: ILogisticRegressionBaseParameters): LogisticRegressionParametersF64 {
    const parameters = new LogisticRegressionParametersF64()
    setLogisticRegressionParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: LogisticRegressionParametersF64): LogisticRegressionF64U64 {
    const xAsF64 = x.asRsMatrix('f64') as DenseMatrixF64
    const yAsU64 = yAsUint64Array(y)
    return LogisticRegressionF64U64.fit(xAsF64, yAsU64, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): LogisticRegressionF64U64 {
    return LogisticRegressionF64U64.deserialize(data)
  }
}

export default LogisticRegressionF64U64Provider
