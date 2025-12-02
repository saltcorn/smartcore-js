import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixF64,
  RandomForestClassifierF64U64,
  RandomForestClassifierParameters,
} from '../../../core-bindings/index.js'
import { type IRandomForestClassifierBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setRandomForestClassifierParametersValues } from './index.js'
import { yAsUint64Array } from '../../../utilities/index.js'

class RandomForestClassifierF64U64Provider
  implements
    PredictorProvider<
      IRandomForestClassifierBaseParameters,
      RandomForestClassifierParameters,
      RandomForestClassifierF64U64
    >
{
  parameters(config: IRandomForestClassifierBaseParameters): RandomForestClassifierParameters {
    const parameters = new RandomForestClassifierParameters()
    setRandomForestClassifierParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: RandomForestClassifierParameters): RandomForestClassifierF64U64 {
    const xAsF64 = x.asRsMatrix('f64') as DenseMatrixF64
    const yAsF64 = yAsUint64Array(y)
    return RandomForestClassifierF64U64.fit(xAsF64, yAsF64, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): RandomForestClassifierF64U64 {
    return RandomForestClassifierF64U64.deserialize(data)
  }
}

export default RandomForestClassifierF64U64Provider
