import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixF64,
  RandomForestRegressorF64F64,
  RandomForestRegressorParameters,
} from '../../../core-bindings/index.js'
import { type IRandomForestRegressorBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setRandomForestRegressorParametersValues } from './index.js'
import { yAsFloat64Array } from '../../../utilities/index.js'

class RandomForestRegressorF64F64Provider
  implements
    PredictorProvider<
      IRandomForestRegressorBaseParameters,
      RandomForestRegressorParameters,
      RandomForestRegressorF64F64
    >
{
  parameters(config: IRandomForestRegressorBaseParameters): RandomForestRegressorParameters {
    const parameters = new RandomForestRegressorParameters()
    setRandomForestRegressorParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: RandomForestRegressorParameters): RandomForestRegressorF64F64 {
    const xAsF64 = x.asRsMatrix('f64') as DenseMatrixF64
    const yAsF64 = yAsFloat64Array(y)
    return RandomForestRegressorF64F64.fit(xAsF64, yAsF64, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f64')
  }

  deserialize(data: Buffer): RandomForestRegressorF64F64 {
    return RandomForestRegressorF64F64.deserialize(data)
  }
}

export default RandomForestRegressorF64F64Provider
