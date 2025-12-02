import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixI32,
  KNNRegressorI32F32EuclidianI32,
  KNNRegressorI32EuclidianI32Parameters,
} from '../../../core-bindings/index.js'
import { type IKNNRegressorBaseParameters, setKNNRegressorParametersValues } from './index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { yAsFloat32Array } from '../../../utilities/index.js'

class KNNRegressorI32F32EuclidianProvider
  implements
    PredictorProvider<
      IKNNRegressorBaseParameters,
      KNNRegressorI32EuclidianI32Parameters,
      KNNRegressorI32F32EuclidianI32
    >
{
  parameters(config: IKNNRegressorBaseParameters): KNNRegressorI32EuclidianI32Parameters {
    const parameters = new KNNRegressorI32EuclidianI32Parameters()
    setKNNRegressorParametersValues(parameters, config)
    return parameters
  }

  estimator(
    x: DenseMatrix,
    y: YType,
    parameters: KNNRegressorI32EuclidianI32Parameters,
  ): KNNRegressorI32F32EuclidianI32 {
    const xAsI32 = x.asRsMatrix('i32') as DenseMatrixI32
    const yAsFloat32 = yAsFloat32Array(y)
    return KNNRegressorI32F32EuclidianI32.fit(xAsI32, yAsFloat32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('i32')
  }

  deserialize(data: Buffer): KNNRegressorI32F32EuclidianI32 {
    return KNNRegressorI32F32EuclidianI32.deserialize(data)
  }
}

export default KNNRegressorI32F32EuclidianProvider
