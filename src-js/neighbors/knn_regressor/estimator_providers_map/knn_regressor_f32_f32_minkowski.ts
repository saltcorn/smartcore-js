import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixF32,
  KNNRegressorF32F32MinkowskiF32,
  KNNRegressorF32MinkowskiF32Parameters,
  KNNRegressorF32EuclidianF32Parameters,
  MinkowskiF32,
} from '../../../core-bindings/index.js'
import { type IKNNRegressorBaseParameters, type MinkowskiParameters, setKNNRegressorParametersValues } from './index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { yAsFloat32Array } from '../../../utilities/index.js'

class KNNRegressorF32F32MinkowskiProvider
  implements
    PredictorProvider<
      IKNNRegressorBaseParameters,
      KNNRegressorF32MinkowskiF32Parameters,
      KNNRegressorF32F32MinkowskiF32
    >
{
  parameters(config: MinkowskiParameters): KNNRegressorF32MinkowskiF32Parameters {
    const parameters = new KNNRegressorF32EuclidianF32Parameters().withDistanceMinkowskiF32(new MinkowskiF32(config.p))
    setKNNRegressorParametersValues(parameters, config)
    return parameters
  }

  estimator(
    x: DenseMatrix,
    y: YType,
    parameters: KNNRegressorF32MinkowskiF32Parameters,
  ): KNNRegressorF32F32MinkowskiF32 {
    const xAsF32 = x.asRsMatrix('f32') as DenseMatrixF32
    const yAsFloat32 = yAsFloat32Array(y)
    return KNNRegressorF32F32MinkowskiF32.fit(xAsF32, yAsFloat32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): KNNRegressorF32F32MinkowskiF32 {
    return KNNRegressorF32F32MinkowskiF32.deserialize(data)
  }
}

export default KNNRegressorF32F32MinkowskiProvider
