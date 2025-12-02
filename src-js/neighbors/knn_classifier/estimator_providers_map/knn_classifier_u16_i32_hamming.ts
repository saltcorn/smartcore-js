import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixU16,
  KNNClassifierU16I32HammingU16,
  KNNClassifierU16HammingU16Parameters,
  KNNClassifierU16EuclidianU16Parameters,
  HammingU16,
} from '../../../core-bindings/index.js'
import { type IKNNClassifierBaseParameters, setKNNClassifierParametersValues } from './index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { yAsInt32Array } from '../../../utilities/index.js'

class KNNClassifierU16I32HammingProvider
  implements
    PredictorProvider<IKNNClassifierBaseParameters, KNNClassifierU16HammingU16Parameters, KNNClassifierU16I32HammingU16>
{
  parameters(config: IKNNClassifierBaseParameters): KNNClassifierU16HammingU16Parameters {
    const parameters = new KNNClassifierU16EuclidianU16Parameters().withDistanceHammingU16(new HammingU16())
    setKNNClassifierParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: KNNClassifierU16HammingU16Parameters): KNNClassifierU16I32HammingU16 {
    const xAsU16 = x.asRsMatrix('u16') as DenseMatrixU16
    const yAsInt32 = yAsInt32Array(y)
    return KNNClassifierU16I32HammingU16.fit(xAsU16, yAsInt32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('u16')
  }

  deserialize(data: Buffer): KNNClassifierU16I32HammingU16 {
    return KNNClassifierU16I32HammingU16.deserialize(data)
  }
}

export default KNNClassifierU16I32HammingProvider
