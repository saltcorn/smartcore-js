import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixU32,
  KNNRegressorU32F32EuclidianU32,
  KNNRegressorU32EuclidianU32Parameters,
} from '../../../core-bindings/index.js'
import { type IKNNRegressorBaseParameters, setKNNRegressorParametersValues } from './index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { yAsFloat32Array } from '../../../utilities/index.js'

class KNNRegressorU32F32EuclidianProvider
  implements
    PredictorProvider<
      IKNNRegressorBaseParameters,
      KNNRegressorU32EuclidianU32Parameters,
      KNNRegressorU32F32EuclidianU32
    >
{
  parameters(config: IKNNRegressorBaseParameters): KNNRegressorU32EuclidianU32Parameters {
    const parameters = new KNNRegressorU32EuclidianU32Parameters()
    setKNNRegressorParametersValues(parameters, config)
    return parameters
  }

  estimator(
    x: DenseMatrix,
    y: YType,
    parameters: KNNRegressorU32EuclidianU32Parameters,
  ): KNNRegressorU32F32EuclidianU32 {
    const xAsU32 = x.asRsMatrix('u32') as DenseMatrixU32
    const yAsFloat32 = yAsFloat32Array(y)
    return KNNRegressorU32F32EuclidianU32.fit(xAsU32, yAsFloat32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('u32')
  }

  deserialize(data: Buffer): KNNRegressorU32F32EuclidianU32 {
    return KNNRegressorU32F32EuclidianU32.deserialize(data)
  }
}

export default KNNRegressorU32F32EuclidianProvider
