import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixU16,
  KNNRegressorU16F32HammingU16,
  KNNRegressorU16HammingU16Parameters,
  KNNRegressorU16EuclidianU16Parameters,
  HammingU16,
} from '../../../core-bindings/index.js'
import { type IKNNRegressorBaseParameters, setKNNRegressorParametersValues } from './index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { yAsFloat32Array } from '../../../utilities/index.js'

class KNNRegressorU16F32HammingProvider
  implements
    PredictorProvider<IKNNRegressorBaseParameters, KNNRegressorU16HammingU16Parameters, KNNRegressorU16F32HammingU16>
{
  parameters(config: IKNNRegressorBaseParameters): KNNRegressorU16HammingU16Parameters {
    const parameters = new KNNRegressorU16EuclidianU16Parameters().withDistanceHammingU16(new HammingU16())
    setKNNRegressorParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: KNNRegressorU16HammingU16Parameters): KNNRegressorU16F32HammingU16 {
    const xAsU16 = x.asRsMatrix('u16') as DenseMatrixU16
    const yAsFloat32 = yAsFloat32Array(y)
    return KNNRegressorU16F32HammingU16.fit(xAsU16, yAsFloat32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('u16')
  }

  deserialize(data: Buffer): KNNRegressorU16F32HammingU16 {
    return KNNRegressorU16F32HammingU16.deserialize(data)
  }
}

export default KNNRegressorU16F32HammingProvider
