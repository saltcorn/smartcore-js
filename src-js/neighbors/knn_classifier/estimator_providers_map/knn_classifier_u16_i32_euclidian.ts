import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixU16,
  KNNClassifierU16I32EuclidianU16,
  KNNClassifierU16EuclidianU16Parameters,
} from '../../../core-bindings/index.js'
import { type IKNNClassifierBaseParameters, setKNNClassifierParametersValues } from './index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { yAsInt32Array } from '../../../utilities/index.js'

class KNNClassifierU16I32EuclidianProvider
  implements
    PredictorProvider<
      IKNNClassifierBaseParameters,
      KNNClassifierU16EuclidianU16Parameters,
      KNNClassifierU16I32EuclidianU16
    >
{
  parameters(config: IKNNClassifierBaseParameters): KNNClassifierU16EuclidianU16Parameters {
    const parameters = new KNNClassifierU16EuclidianU16Parameters()
    setKNNClassifierParametersValues(parameters, config)
    return parameters
  }

  estimator(
    x: DenseMatrix,
    y: YType,
    parameters: KNNClassifierU16EuclidianU16Parameters,
  ): KNNClassifierU16I32EuclidianU16 {
    const xAsU16 = x.asRsMatrix('u16') as DenseMatrixU16
    const yAsInt32 = yAsInt32Array(y)
    return KNNClassifierU16I32EuclidianU16.fit(xAsU16, yAsInt32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('u16')
  }

  deserialize(data: Buffer): KNNClassifierU16I32EuclidianU16 {
    return KNNClassifierU16I32EuclidianU16.deserialize(data)
  }
}

export default KNNClassifierU16I32EuclidianProvider
