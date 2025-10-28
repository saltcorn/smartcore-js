import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixU32,
  KNNClassifierU32I32EuclidianU32,
  KNNClassifierU32EuclidianU32Parameters,
} from '../../../core-bindings/index.js'
import { type IKNNClassifierBaseParameters, setKNNClassifierParametersValues } from './index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { yAsInt32Array } from '../../../utilities/index.js'

class KNNClassifierU32I32EuclidianProvider
  implements
    PredictorProvider<
      IKNNClassifierBaseParameters,
      KNNClassifierU32EuclidianU32Parameters,
      KNNClassifierU32I32EuclidianU32
    >
{
  parameters(config: IKNNClassifierBaseParameters): KNNClassifierU32EuclidianU32Parameters {
    const parameters = new KNNClassifierU32EuclidianU32Parameters()
    setKNNClassifierParametersValues(parameters, config)
    return parameters
  }

  estimator(
    x: DenseMatrix,
    y: YType,
    parameters: KNNClassifierU32EuclidianU32Parameters,
  ): KNNClassifierU32I32EuclidianU32 {
    const xAsU32 = x.asRsMatrix('u32') as DenseMatrixU32
    const yAsInt32 = yAsInt32Array(y)
    return KNNClassifierU32I32EuclidianU32.fit(xAsU32, yAsInt32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('u32')
  }

  deserialize(data: Buffer): KNNClassifierU32I32EuclidianU32 {
    return KNNClassifierU32I32EuclidianU32.deserialize(data)
  }
}

export default KNNClassifierU32I32EuclidianProvider
