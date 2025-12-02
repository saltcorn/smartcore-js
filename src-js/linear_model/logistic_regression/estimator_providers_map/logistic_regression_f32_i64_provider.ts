import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixF32,
  LogisticRegressionF32I64,
  LogisticRegressionParametersF32,
} from '../../../core-bindings/index.js'
import { type ILogisticRegressionBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setLogisticRegressionParametersValues } from './index.js'
import { yAsInt64Array } from '../../../utilities/index.js'

class LogisticRegressionF32I64Provider
  implements
    PredictorProvider<ILogisticRegressionBaseParameters, LogisticRegressionParametersF32, LogisticRegressionF32I64>
{
  parameters(config: ILogisticRegressionBaseParameters): LogisticRegressionParametersF32 {
    const parameters = new LogisticRegressionParametersF32()
    setLogisticRegressionParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: LogisticRegressionParametersF32): LogisticRegressionF32I64 {
    const xAsF32 = x.asRsMatrix('f32') as DenseMatrixF32
    const yAsI64 = yAsInt64Array(y)
    return LogisticRegressionF32I64.fit(xAsF32, yAsI64, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): LogisticRegressionF32I64 {
    return LogisticRegressionF32I64.deserialize(data)
  }
}

export default LogisticRegressionF32I64Provider
