import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixI32,
  KNNClassifierI32I32EuclidianI32,
  KNNClassifierI32EuclidianI32Parameters,
} from '../../../core-bindings/index.js'
import { type IKNNClassifierBaseParameters, setKNNClassifierParametersValues } from './index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { yAsInt32Array } from '../../../utilities/index.js'

class KNNClassifierI32I32EuclidianProvider
  implements
    PredictorProvider<
      IKNNClassifierBaseParameters,
      KNNClassifierI32EuclidianI32Parameters,
      KNNClassifierI32I32EuclidianI32
    >
{
  parameters(config: IKNNClassifierBaseParameters): KNNClassifierI32EuclidianI32Parameters {
    const parameters = new KNNClassifierI32EuclidianI32Parameters()
    setKNNClassifierParametersValues(parameters, config)
    return parameters
  }

  estimator(
    x: DenseMatrix,
    y: YType,
    parameters: KNNClassifierI32EuclidianI32Parameters,
  ): KNNClassifierI32I32EuclidianI32 {
    const xAsI32 = x.asRsMatrix('i32') as DenseMatrixI32
    const yAsInt32 = yAsInt32Array(y)
    return KNNClassifierI32I32EuclidianI32.fit(xAsI32, yAsInt32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('i32')
  }

  deserialize(data: Buffer): KNNClassifierI32I32EuclidianI32 {
    return KNNClassifierI32I32EuclidianI32.deserialize(data)
  }
}

export default KNNClassifierI32I32EuclidianProvider
