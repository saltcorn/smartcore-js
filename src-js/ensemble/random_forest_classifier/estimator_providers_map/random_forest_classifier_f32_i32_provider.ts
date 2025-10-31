import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixF32,
  RandomForestClassifierF32I32,
  RandomForestClassifierParameters,
} from '../../../core-bindings/index.js'
import { type IRandomForestClassifierBaseParameters } from '../index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { setRandomForestClassifierParametersValues } from './index.js'
import { yAsInt32Array } from '../../../utilities/index.js'

class RandomForestClassifierF32I32Provider
  implements
    PredictorProvider<
      IRandomForestClassifierBaseParameters,
      RandomForestClassifierParameters,
      RandomForestClassifierF32I32
    >
{
  parameters(config: IRandomForestClassifierBaseParameters): RandomForestClassifierParameters {
    const parameters = new RandomForestClassifierParameters()
    setRandomForestClassifierParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: RandomForestClassifierParameters): RandomForestClassifierF32I32 {
    const xAsF32 = x.asRsMatrix('f32') as DenseMatrixF32
    const yAsI32 = yAsInt32Array(y)
    return RandomForestClassifierF32I32.fit(xAsF32, yAsI32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): RandomForestClassifierF32I32 {
    return RandomForestClassifierF32I32.deserialize(data)
  }
}

export default RandomForestClassifierF32I32Provider
