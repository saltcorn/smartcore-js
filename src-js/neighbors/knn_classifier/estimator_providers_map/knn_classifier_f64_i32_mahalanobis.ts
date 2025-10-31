import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixF64,
  KNNClassifierF64I32MahalanobisF64,
  KNNClassifierF64MahalanobisF64Parameters,
  KNNClassifierF64EuclidianF64Parameters,
  MahalanobisF64,
} from '../../../core-bindings/index.js'
import { type IKNNClassifierBaseParameters, setKNNClassifierParametersValues } from './index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { yAsInt32Array } from '../../../utilities/index.js'

interface ManhattanParameters extends IKNNClassifierBaseParameters {
  data: DenseMatrix
}

class KNNClassifierF32I32MahalanobisProvider
  implements
    PredictorProvider<
      IKNNClassifierBaseParameters,
      KNNClassifierF64MahalanobisF64Parameters,
      KNNClassifierF64I32MahalanobisF64
    >
{
  parameters(config: ManhattanParameters): KNNClassifierF64MahalanobisF64Parameters {
    const parameters = new KNNClassifierF64EuclidianF64Parameters().withDistanceMahalanobisF64(
      new MahalanobisF64(config.data.asRsMatrix('f64') as DenseMatrixF64),
    )
    setKNNClassifierParametersValues(parameters, config)
    return parameters
  }

  estimator(
    x: DenseMatrix,
    y: YType,
    parameters: KNNClassifierF64MahalanobisF64Parameters,
  ): KNNClassifierF64I32MahalanobisF64 {
    const xAsF64 = x.asRsMatrix('f64') as DenseMatrixF64
    const yAsInt32 = yAsInt32Array(y)
    return KNNClassifierF64I32MahalanobisF64.fit(xAsF64, yAsInt32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f64')
  }

  deserialize(data: Buffer): KNNClassifierF64I32MahalanobisF64 {
    return KNNClassifierF64I32MahalanobisF64.deserialize(data)
  }
}

export default KNNClassifierF32I32MahalanobisProvider
