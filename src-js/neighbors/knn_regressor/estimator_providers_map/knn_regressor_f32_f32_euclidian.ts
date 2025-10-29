import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixF32,
  KNNRegressorF32F32EuclidianF32,
  KNNRegressorF32EuclidianF32Parameters,
} from '../../../core-bindings/index.js'
import { type IKNNRegressorBaseParameters, setKNNRegressorParametersValues } from './index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { yAsFloat32Array } from '../../../utilities/index.js'

class KNNRegressorF32F32EuclidianProvider
  implements
    PredictorProvider<
      IKNNRegressorBaseParameters,
      KNNRegressorF32EuclidianF32Parameters,
      KNNRegressorF32F32EuclidianF32
    >
{
  parameters(config: IKNNRegressorBaseParameters): KNNRegressorF32EuclidianF32Parameters {
    const parameters = new KNNRegressorF32EuclidianF32Parameters()
    setKNNRegressorParametersValues(parameters, config)
    return parameters
  }

  estimator(
    x: DenseMatrix,
    y: YType,
    parameters: KNNRegressorF32EuclidianF32Parameters,
  ): KNNRegressorF32F32EuclidianF32 {
    const xAsF32 = x.asRsMatrix('f32') as DenseMatrixF32
    const yAsFloat32 = yAsFloat32Array(y)
    return KNNRegressorF32F32EuclidianF32.fit(xAsF32, yAsFloat32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): KNNRegressorF32F32EuclidianF32 {
    return KNNRegressorF32F32EuclidianF32.deserialize(data)
  }
}

export default KNNRegressorF32F32EuclidianProvider
