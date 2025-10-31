import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixI32,
  KNNRegressorI32F32MinkowskiI32,
  KNNRegressorI32MinkowskiI32Parameters,
  KNNRegressorI32EuclidianI32Parameters,
  MinkowskiI32,
} from '../../../core-bindings/index.js'
import { type IKNNRegressorBaseParameters, type MinkowskiParameters, setKNNRegressorParametersValues } from './index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { yAsFloat32Array } from '../../../utilities/index.js'

class KNNRegressorI32F32MinkowskiProvider
  implements
    PredictorProvider<
      IKNNRegressorBaseParameters,
      KNNRegressorI32MinkowskiI32Parameters,
      KNNRegressorI32F32MinkowskiI32
    >
{
  parameters(config: MinkowskiParameters): KNNRegressorI32MinkowskiI32Parameters {
    const parameters = new KNNRegressorI32EuclidianI32Parameters().withDistanceMinkowskiI32(new MinkowskiI32(config.p))
    setKNNRegressorParametersValues(parameters, config)
    return parameters
  }

  estimator(
    x: DenseMatrix,
    y: YType,
    parameters: KNNRegressorI32MinkowskiI32Parameters,
  ): KNNRegressorI32F32MinkowskiI32 {
    const xAsI32 = x.asRsMatrix('i32') as DenseMatrixI32
    const yAsFloat32 = yAsFloat32Array(y)
    return KNNRegressorI32F32MinkowskiI32.fit(xAsI32, yAsFloat32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('i32')
  }

  deserialize(data: Buffer): KNNRegressorI32F32MinkowskiI32 {
    return KNNRegressorI32F32MinkowskiI32.deserialize(data)
  }
}

export default KNNRegressorI32F32MinkowskiProvider
