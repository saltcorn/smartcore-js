import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixF32,
  RandomForestClassifierF32U64,
  RandomForestClassifierParameters,
} from '../../../core-bindings/index.js'
import { type IRandomForestClassifierBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setRandomForestClassifierParametersValues } from './index.js'
import { yAsUint64Array } from '../../../utilities/index.js'

class RandomForestClassifierF32U64Provider
  implements
    PredictorProvider<
      IRandomForestClassifierBaseParameters,
      RandomForestClassifierParameters,
      RandomForestClassifierF32U64
    >
{
  parameters(config: IRandomForestClassifierBaseParameters): RandomForestClassifierParameters {
    const parameters = new RandomForestClassifierParameters()
    setRandomForestClassifierParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: RandomForestClassifierParameters): RandomForestClassifierF32U64 {
    const xAsF32 = x.asRsMatrix('f32') as DenseMatrixF32
    const yAsF64 = yAsUint64Array(y)
    return RandomForestClassifierF32U64.fit(xAsF32, yAsF64, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): RandomForestClassifierF32U64 {
    return RandomForestClassifierF32U64.deserialize(data)
  }
}

export default RandomForestClassifierF32U64Provider
