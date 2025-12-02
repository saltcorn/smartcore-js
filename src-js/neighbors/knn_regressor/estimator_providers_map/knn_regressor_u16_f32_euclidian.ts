import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixU16,
  KNNRegressorU16F32EuclidianU16,
  KNNRegressorU16EuclidianU16Parameters,
} from '../../../core-bindings/index.js'
import { type IKNNRegressorBaseParameters, setKNNRegressorParametersValues } from './index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { yAsFloat32Array } from '../../../utilities/index.js'

class KNNRegressorU16F32EuclidianProvider
  implements
    PredictorProvider<
      IKNNRegressorBaseParameters,
      KNNRegressorU16EuclidianU16Parameters,
      KNNRegressorU16F32EuclidianU16
    >
{
  parameters(config: IKNNRegressorBaseParameters): KNNRegressorU16EuclidianU16Parameters {
    const parameters = new KNNRegressorU16EuclidianU16Parameters()
    setKNNRegressorParametersValues(parameters, config)
    return parameters
  }

  estimator(
    x: DenseMatrix,
    y: YType,
    parameters: KNNRegressorU16EuclidianU16Parameters,
  ): KNNRegressorU16F32EuclidianU16 {
    const xAsU16 = x.asRsMatrix('u16') as DenseMatrixU16
    const yAsFloat32 = yAsFloat32Array(y)
    return KNNRegressorU16F32EuclidianU16.fit(xAsU16, yAsFloat32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('u16')
  }

  deserialize(data: Buffer): KNNRegressorU16F32EuclidianU16 {
    return KNNRegressorU16F32EuclidianU16.deserialize(data)
  }
}

export default KNNRegressorU16F32EuclidianProvider
