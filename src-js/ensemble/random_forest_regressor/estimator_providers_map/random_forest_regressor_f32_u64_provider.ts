import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixF32,
  RandomForestRegressorF32U64,
  RandomForestRegressorParameters,
} from '../../../core-bindings/index.js'
import { type IRandomForestRegressorBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setRandomForestRegressorParametersValues } from './index.js'
import { yAsUint64Array } from '../../../utilities/index.js'

class RandomForestRegressorF32U64Provider
  implements
    PredictorProvider<
      IRandomForestRegressorBaseParameters,
      RandomForestRegressorParameters,
      RandomForestRegressorF32U64
    >
{
  parameters(config: IRandomForestRegressorBaseParameters): RandomForestRegressorParameters {
    const parameters = new RandomForestRegressorParameters()
    setRandomForestRegressorParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: RandomForestRegressorParameters): RandomForestRegressorF32U64 {
    const xAsF32 = x.asRsMatrix('f32') as DenseMatrixF32
    const yAsF64 = yAsUint64Array(y)
    return RandomForestRegressorF32U64.fit(xAsF32, yAsF64, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): RandomForestRegressorF32U64 {
    return RandomForestRegressorF32U64.deserialize(data)
  }
}

export default RandomForestRegressorF32U64Provider
