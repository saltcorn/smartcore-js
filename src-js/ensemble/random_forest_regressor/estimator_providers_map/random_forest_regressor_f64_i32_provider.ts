import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixF64,
  RandomForestRegressorF64I32,
  RandomForestRegressorParameters,
} from '../../../core-bindings/index.js'
import { type IRandomForestRegressorBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setRandomForestRegressorParametersValues } from './index.js'
import { yAsInt32Array } from '../../../utilities/index.js'

class RandomForestRegressorF64I32Provider
  implements
    PredictorProvider<
      IRandomForestRegressorBaseParameters,
      RandomForestRegressorParameters,
      RandomForestRegressorF64I32
    >
{
  parameters(config: IRandomForestRegressorBaseParameters): RandomForestRegressorParameters {
    const parameters = new RandomForestRegressorParameters()
    setRandomForestRegressorParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: RandomForestRegressorParameters): RandomForestRegressorF64I32 {
    const xAsF64 = x.asRsMatrix('f64') as DenseMatrixF64
    const yAsF64 = yAsInt32Array(y)
    return RandomForestRegressorF64I32.fit(xAsF64, yAsF64, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f64')
  }

  deserialize(data: Buffer): RandomForestRegressorF64I32 {
    return RandomForestRegressorF64I32.deserialize(data)
  }
}

export default RandomForestRegressorF64I32Provider
