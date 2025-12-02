import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixU8,
  KNNRegressorU8F32EuclidianU8,
  KNNRegressorU8EuclidianU8Parameters,
} from '../../../core-bindings/index.js'
import { type IKNNRegressorBaseParameters, setKNNRegressorParametersValues } from './index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { yAsFloat32Array } from '../../../utilities/index.js'

class KNNRegressorU8F32EuclidianProvider
  implements
    PredictorProvider<IKNNRegressorBaseParameters, KNNRegressorU8EuclidianU8Parameters, KNNRegressorU8F32EuclidianU8>
{
  parameters(config: IKNNRegressorBaseParameters): KNNRegressorU8EuclidianU8Parameters {
    const parameters = new KNNRegressorU8EuclidianU8Parameters()
    setKNNRegressorParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, y: YType, parameters: KNNRegressorU8EuclidianU8Parameters): KNNRegressorU8F32EuclidianU8 {
    const xAsU8 = x.asRsMatrix('u8') as DenseMatrixU8
    const yAsFloat32 = yAsFloat32Array(y)
    return KNNRegressorU8F32EuclidianU8.fit(xAsU8, yAsFloat32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('u8')
  }

  deserialize(data: Buffer): KNNRegressorU8F32EuclidianU8 {
    return KNNRegressorU8F32EuclidianU8.deserialize(data)
  }
}

export default KNNRegressorU8F32EuclidianProvider
