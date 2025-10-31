import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixI64,
  KNNClassifierI64I32ManhattanI64,
  KNNClassifierI64ManhattanI64Parameters,
  KNNClassifierI64EuclidianI64Parameters,
  ManhattanI64,
} from '../../../core-bindings/index.js'
import { type IKNNClassifierBaseParameters, setKNNClassifierParametersValues } from './index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { yAsInt32Array } from '../../../utilities/index.js'

class KNNClassifierI64I32ManhattanProvider
  implements
    PredictorProvider<
      IKNNClassifierBaseParameters,
      KNNClassifierI64ManhattanI64Parameters,
      KNNClassifierI64I32ManhattanI64
    >
{
  parameters(config: IKNNClassifierBaseParameters): KNNClassifierI64ManhattanI64Parameters {
    const parameters = new KNNClassifierI64EuclidianI64Parameters().withDistanceManhattanI64(new ManhattanI64())
    setKNNClassifierParametersValues(parameters, config)
    return parameters
  }

  estimator(
    x: DenseMatrix,
    y: YType,
    parameters: KNNClassifierI64ManhattanI64Parameters,
  ): KNNClassifierI64I32ManhattanI64 {
    const xAsI64 = x.asRsMatrix('i64') as DenseMatrixI64
    const yAsInt32 = yAsInt32Array(y)
    return KNNClassifierI64I32ManhattanI64.fit(xAsI64, yAsInt32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('i64')
  }

  deserialize(data: Buffer): KNNClassifierI64I32ManhattanI64 {
    return KNNClassifierI64I32ManhattanI64.deserialize(data)
  }
}

export default KNNClassifierI64I32ManhattanProvider
