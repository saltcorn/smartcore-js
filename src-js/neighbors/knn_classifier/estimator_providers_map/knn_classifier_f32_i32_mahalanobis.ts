import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixF32,
  KNNClassifierF32I32MahalanobisF32,
  KNNClassifierF32MahalanobisF32Parameters,
  KNNClassifierF32EuclidianF32Parameters,
  MahalanobisF32,
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
      KNNClassifierF32MahalanobisF32Parameters,
      KNNClassifierF32I32MahalanobisF32
    >
{
  parameters(config: ManhattanParameters): KNNClassifierF32MahalanobisF32Parameters {
    const parameters = new KNNClassifierF32EuclidianF32Parameters().withDistanceMahalanobisF32(
      new MahalanobisF32(config.data.asRsMatrix('f32') as DenseMatrixF32),
    )
    setKNNClassifierParametersValues(parameters, config)
    return parameters
  }

  estimator(
    x: DenseMatrix,
    y: YType,
    parameters: KNNClassifierF32MahalanobisF32Parameters,
  ): KNNClassifierF32I32MahalanobisF32 {
    const xAsF32 = x.asRsMatrix('f32') as DenseMatrixF32
    const yAsInt32 = yAsInt32Array(y)
    return KNNClassifierF32I32MahalanobisF32.fit(xAsF32, yAsInt32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): KNNClassifierF32I32MahalanobisF32 {
    return KNNClassifierF32I32MahalanobisF32.deserialize(data)
  }
}

export default KNNClassifierF32I32MahalanobisProvider
