import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixF32,
  LogisticRegressionF32U64,
  LogisticRegressionParametersF32,
} from '../../../core-bindings/index.js'
import { type ILogisticRegressionBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setLogisticRegressionParametersValues } from './index.js'
import { yAsUint64Array } from '../../../utilities/index.js'

class LogisticRegressionF32U64Provider
  implements
    PredictorProvider<ILogisticRegressionBaseParameters, LogisticRegressionParametersF32, LogisticRegressionF32U64>
{
  parameters(config: ILogisticRegressionBaseParameters): LogisticRegressionParametersF32 {
    const parameters = new LogisticRegressionParametersF32()
    setLogisticRegressionParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: LogisticRegressionParametersF32): LogisticRegressionF32U64 {
    const xAsF32 = x.asRsMatrix('f32') as DenseMatrixF32
    const yAsU64 = yAsUint64Array(y)
    return LogisticRegressionF32U64.fit(xAsF32, yAsU64, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): LogisticRegressionF32U64 {
    return LogisticRegressionF32U64.deserialize(data)
  }
}

export default LogisticRegressionF32U64Provider
