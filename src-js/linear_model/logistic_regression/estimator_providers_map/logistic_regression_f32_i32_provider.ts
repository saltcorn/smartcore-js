import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixF32,
  LogisticRegressionF32I32,
  LogisticRegressionParametersF32,
} from '../../../core-bindings/index.js'
import { type ILogisticRegressionBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setLogisticRegressionParametersValues } from './index.js'
import { yAsInt32Array } from '../../../utilities/index.js'

class LogisticRegressionF32I32Provider
  implements
    PredictorProvider<ILogisticRegressionBaseParameters, LogisticRegressionParametersF32, LogisticRegressionF32I32>
{
  parameters(config: ILogisticRegressionBaseParameters): LogisticRegressionParametersF32 {
    const parameters = new LogisticRegressionParametersF32()
    setLogisticRegressionParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: LogisticRegressionParametersF32): LogisticRegressionF32I32 {
    const xAsF32 = x.asRsMatrix('f32') as DenseMatrixF32
    const yAsI32 = yAsInt32Array(y)
    return LogisticRegressionF32I32.fit(xAsF32, yAsI32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): LogisticRegressionF32I32 {
    return LogisticRegressionF32I32.deserialize(data)
  }
}

export default LogisticRegressionF32I32Provider
