import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixU64,
  KNNClassifierU64I32EuclidianU64,
  KNNClassifierU64EuclidianU64Parameters,
} from '../../../core-bindings/index.js'
import { type IKNNClassifierBaseParameters, setKNNClassifierParametersValues } from './index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { yAsInt32Array } from '../../../utilities/index.js'

class KNNClassifierU64I32EuclidianProvider
  implements
    PredictorProvider<
      IKNNClassifierBaseParameters,
      KNNClassifierU64EuclidianU64Parameters,
      KNNClassifierU64I32EuclidianU64
    >
{
  parameters(config: IKNNClassifierBaseParameters): KNNClassifierU64EuclidianU64Parameters {
    const parameters = new KNNClassifierU64EuclidianU64Parameters()
    setKNNClassifierParametersValues(parameters, config)
    return parameters
  }

  estimator(
    x: DenseMatrix,
    y: YType,
    parameters: KNNClassifierU64EuclidianU64Parameters,
  ): KNNClassifierU64I32EuclidianU64 {
    const xAsU64 = x.asRsMatrix('u64') as DenseMatrixU64
    const yAsInt32 = yAsInt32Array(y)
    return KNNClassifierU64I32EuclidianU64.fit(xAsU64, yAsInt32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('u64')
  }

  deserialize(data: Buffer): KNNClassifierU64I32EuclidianU64 {
    return KNNClassifierU64I32EuclidianU64.deserialize(data)
  }
}

export default KNNClassifierU64I32EuclidianProvider
