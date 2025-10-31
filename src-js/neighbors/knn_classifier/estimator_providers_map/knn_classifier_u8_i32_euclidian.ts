import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixU8,
  KNNClassifierU8I32EuclidianU8,
  KNNClassifierU8EuclidianU8Parameters,
} from '../../../core-bindings/index.js'
import { type IKNNClassifierBaseParameters, setKNNClassifierParametersValues } from './index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { yAsInt32Array } from '../../../utilities/index.js'

class KNNClassifierU8I32EuclidianProvider
  implements
    PredictorProvider<IKNNClassifierBaseParameters, KNNClassifierU8EuclidianU8Parameters, KNNClassifierU8I32EuclidianU8>
{
  parameters(config: IKNNClassifierBaseParameters): KNNClassifierU8EuclidianU8Parameters {
    const parameters = new KNNClassifierU8EuclidianU8Parameters()
    setKNNClassifierParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: KNNClassifierU8EuclidianU8Parameters): KNNClassifierU8I32EuclidianU8 {
    const xAsU8 = x.asRsMatrix('u8') as DenseMatrixU8
    const yAsInt32 = yAsInt32Array(y)
    return KNNClassifierU8I32EuclidianU8.fit(xAsU8, yAsInt32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('u8')
  }

  deserialize(data: Buffer): KNNClassifierU8I32EuclidianU8 {
    return KNNClassifierU8I32EuclidianU8.deserialize(data)
  }
}

export default KNNClassifierU8I32EuclidianProvider
