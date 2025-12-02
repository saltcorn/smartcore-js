import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixF64,
  KNNRegressorF64F32MahalanobisF64,
  KNNRegressorF64MahalanobisF64Parameters,
  KNNRegressorF64EuclidianF64Parameters,
  MahalanobisF64,
} from '../../../core-bindings/index.js'
import {
  type IKNNRegressorBaseParameters,
  type MahalanobisParameters,
  setKNNRegressorParametersValues,
} from './index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { yAsFloat32Array } from '../../../utilities/index.js'

class KNNRegressorF32I32MahalanobisProvider
  implements
    PredictorProvider<
      IKNNRegressorBaseParameters,
      KNNRegressorF64MahalanobisF64Parameters,
      KNNRegressorF64F32MahalanobisF64
    >
{
  parameters(config: MahalanobisParameters): KNNRegressorF64MahalanobisF64Parameters {
    const parameters = new KNNRegressorF64EuclidianF64Parameters().withDistanceMahalanobisF64(
      new MahalanobisF64(config.data.asRsMatrix('f64') as DenseMatrixF64),
    )
    setKNNRegressorParametersValues(parameters, config)
    return parameters
  }

  estimator(
    x: DenseMatrix,
    y: YType,
    parameters: KNNRegressorF64MahalanobisF64Parameters,
  ): KNNRegressorF64F32MahalanobisF64 {
    const xAsF64 = x.asRsMatrix('f64') as DenseMatrixF64
    const yAsFloat32 = yAsFloat32Array(y)
    return KNNRegressorF64F32MahalanobisF64.fit(xAsF64, yAsFloat32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f64')
  }

  deserialize(data: Buffer): KNNRegressorF64F32MahalanobisF64 {
    return KNNRegressorF64F32MahalanobisF64.deserialize(data)
  }
}

export default KNNRegressorF32I32MahalanobisProvider
