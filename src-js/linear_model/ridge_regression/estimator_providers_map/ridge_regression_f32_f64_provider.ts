import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import { DenseMatrixF32, RidgeRegressionF32F64, RidgeRegressionF32Parameters } from '../../../core-bindings/index.js'
import { type IRidgeRegressionBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setRidgeRegressionParametersValues } from './index.js'
import { yAsFloat64Array } from '../../../utilities/index.js'

class RidgeRegressionF32F64Provider
  implements PredictorProvider<IRidgeRegressionBaseParameters, RidgeRegressionF32Parameters, RidgeRegressionF32F64>
{
  parameters(config: IRidgeRegressionBaseParameters): RidgeRegressionF32Parameters {
    const parameters = new RidgeRegressionF32Parameters()
    setRidgeRegressionParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: RidgeRegressionF32Parameters): RidgeRegressionF32F64 {
    const xAsF32 = x.asRsMatrix('f32') as DenseMatrixF32
    const yAsF64 = yAsFloat64Array(y)
    return RidgeRegressionF32F64.fit(xAsF32, yAsF64, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): RidgeRegressionF32F64 {
    return RidgeRegressionF32F64.deserialize(data)
  }
}

export default RidgeRegressionF32F64Provider
