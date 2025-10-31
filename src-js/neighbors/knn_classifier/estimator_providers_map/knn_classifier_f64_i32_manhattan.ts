import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixF64,
  KNNClassifierF64I32ManhattanF64,
  KNNClassifierF64ManhattanF64Parameters,
  KNNClassifierF64EuclidianF64Parameters,
  ManhattanF64,
} from '../../../core-bindings/index.js'
import { type IKNNClassifierBaseParameters, setKNNClassifierParametersValues } from './index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { yAsInt32Array } from '../../../utilities/index.js'

class KNNClassifierF64I32ManhattanProvider
  implements
    PredictorProvider<
      IKNNClassifierBaseParameters,
      KNNClassifierF64ManhattanF64Parameters,
      KNNClassifierF64I32ManhattanF64
    >
{
  parameters(config: IKNNClassifierBaseParameters): KNNClassifierF64ManhattanF64Parameters {
    const parameters = new KNNClassifierF64EuclidianF64Parameters().withDistanceManhattanF64(new ManhattanF64())
    setKNNClassifierParametersValues(parameters, config)
    return parameters
  }

  estimator(
    x: DenseMatrix,
    y: YType,
    parameters: KNNClassifierF64ManhattanF64Parameters,
  ): KNNClassifierF64I32ManhattanF64 {
    const xAsF64 = x.asRsMatrix('f64') as DenseMatrixF64
    const yAsInt32 = yAsInt32Array(y)
    return KNNClassifierF64I32ManhattanF64.fit(xAsF64, yAsInt32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f64')
  }

  deserialize(data: Buffer): KNNClassifierF64I32ManhattanF64 {
    return KNNClassifierF64I32ManhattanF64.deserialize(data)
  }
}

export default KNNClassifierF64I32ManhattanProvider
