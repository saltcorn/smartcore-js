import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixF64,
  RandomForestClassifierF64I32,
  RandomForestClassifierParameters,
} from '../../../core-bindings/index.js'
import { type IRandomForestClassifierBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setRandomForestClassifierParametersValues } from './index.js'
import { yAsInt32Array } from '../../../utilities/index.js'

class RandomForestClassifierF64I32Provider
  implements
    PredictorProvider<
      IRandomForestClassifierBaseParameters,
      RandomForestClassifierParameters,
      RandomForestClassifierF64I32
    >
{
  parameters(config: IRandomForestClassifierBaseParameters): RandomForestClassifierParameters {
    const parameters = new RandomForestClassifierParameters()
    setRandomForestClassifierParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: RandomForestClassifierParameters): RandomForestClassifierF64I32 {
    const xAsF64 = x.asRsMatrix('f64') as DenseMatrixF64
    const yAsF64 = yAsInt32Array(y)
    return RandomForestClassifierF64I32.fit(xAsF64, yAsF64, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f64')
  }

  deserialize(data: Buffer): RandomForestClassifierF64I32 {
    return RandomForestClassifierF64I32.deserialize(data)
  }
}

export default RandomForestClassifierF64I32Provider
