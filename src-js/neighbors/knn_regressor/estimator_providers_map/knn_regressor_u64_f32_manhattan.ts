import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixU64,
  KNNRegressorU64F32ManhattanU64,
  KNNRegressorU64ManhattanU64Parameters,
  KNNRegressorU64EuclidianU64Parameters,
  ManhattanU64,
} from '../../../core-bindings/index.js'
import { type IKNNRegressorBaseParameters, setKNNRegressorParametersValues } from './index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { yAsFloat32Array } from '../../../utilities/index.js'

class KNNRegressorU64F32ManhattanProvider
  implements
    PredictorProvider<
      IKNNRegressorBaseParameters,
      KNNRegressorU64ManhattanU64Parameters,
      KNNRegressorU64F32ManhattanU64
    >
{
  parameters(config: IKNNRegressorBaseParameters): KNNRegressorU64ManhattanU64Parameters {
    const parameters = new KNNRegressorU64EuclidianU64Parameters().withDistanceManhattanU64(new ManhattanU64())
    setKNNRegressorParametersValues(parameters, config)
    return parameters
  }

  estimator(
    x: DenseMatrix,
    y: YType,
    parameters: KNNRegressorU64ManhattanU64Parameters,
  ): KNNRegressorU64F32ManhattanU64 {
    const xAsU64 = x.asRsMatrix('u64') as DenseMatrixU64
    const yAsFloat32 = yAsFloat32Array(y)
    return KNNRegressorU64F32ManhattanU64.fit(xAsU64, yAsFloat32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('u64')
  }

  deserialize(data: Buffer): KNNRegressorU64F32ManhattanU64 {
    return KNNRegressorU64F32ManhattanU64.deserialize(data)
  }
}

export default KNNRegressorU64F32ManhattanProvider
