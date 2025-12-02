import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixU8,
  KNNClassifierU8I32HammingU8,
  KNNClassifierU8HammingU8Parameters,
  KNNClassifierU8EuclidianU8Parameters,
  HammingU8,
} from '../../../core-bindings/index.js'
import { type IKNNClassifierBaseParameters, setKNNClassifierParametersValues } from './index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { yAsInt32Array } from '../../../utilities/index.js'

class KNNClassifierU8I32HammingProvider
  implements
    PredictorProvider<IKNNClassifierBaseParameters, KNNClassifierU8HammingU8Parameters, KNNClassifierU8I32HammingU8>
{
  parameters(config: IKNNClassifierBaseParameters): KNNClassifierU8HammingU8Parameters {
    const parameters = new KNNClassifierU8EuclidianU8Parameters().withDistanceHammingU8(new HammingU8())
    setKNNClassifierParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: KNNClassifierU8HammingU8Parameters): KNNClassifierU8I32HammingU8 {
    const xAsU8 = x.asRsMatrix('u8') as DenseMatrixU8
    const yAsInt32 = yAsInt32Array(y)
    return KNNClassifierU8I32HammingU8.fit(xAsU8, yAsInt32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('u8')
  }

  deserialize(data: Buffer): KNNClassifierU8I32HammingU8 {
    return KNNClassifierU8I32HammingU8.deserialize(data)
  }
}

export default KNNClassifierU8I32HammingProvider
