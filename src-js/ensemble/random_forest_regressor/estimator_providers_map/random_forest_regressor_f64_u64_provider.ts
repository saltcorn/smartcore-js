import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixF64,
  RandomForestRegressorF64U64,
  RandomForestRegressorParameters,
} from '../../../core-bindings/index.js'
import { type IRandomForestRegressorBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setRandomForestRegressorParametersValues } from './index.js'
import { yAsUint64Array } from '../../../utilities/index.js'

class RandomForestRegressorF64U64Provider
  implements
    PredictorProvider<
      IRandomForestRegressorBaseParameters,
      RandomForestRegressorParameters,
      RandomForestRegressorF64U64
    >
{
  parameters(config: IRandomForestRegressorBaseParameters): RandomForestRegressorParameters {
    const parameters = new RandomForestRegressorParameters()
    setRandomForestRegressorParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: RandomForestRegressorParameters): RandomForestRegressorF64U64 {
    const xAsF64 = x.asRsMatrix('f64') as DenseMatrixF64
    const yAsF64 = yAsUint64Array(y)
    return RandomForestRegressorF64U64.fit(xAsF64, yAsF64, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): RandomForestRegressorF64U64 {
    return RandomForestRegressorF64U64.deserialize(data)
  }
}

export default RandomForestRegressorF64U64Provider
