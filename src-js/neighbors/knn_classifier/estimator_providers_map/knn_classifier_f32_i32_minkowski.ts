import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixF32,
  KNNClassifierF32I32MinkowskiF32,
  KNNClassifierF32MinkowskiF32Parameters,
  KNNClassifierF32EuclidianF32Parameters,
  MinkowskiF32,
} from '../../../core-bindings/index.js'
import { type IKNNClassifierBaseParameters, setKNNClassifierParametersValues } from './index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { yAsInt32Array } from '../../../utilities/index.js'

interface ManhattanParameters extends IKNNClassifierBaseParameters {
  p: number
}

class KNNClassifierF32I32MinkowskiProvider
  implements
    PredictorProvider<
      IKNNClassifierBaseParameters,
      KNNClassifierF32MinkowskiF32Parameters,
      KNNClassifierF32I32MinkowskiF32
    >
{
  parameters(config: ManhattanParameters): KNNClassifierF32MinkowskiF32Parameters {
    const parameters = new KNNClassifierF32EuclidianF32Parameters().withDistanceMinkowskiF32(new MinkowskiF32(config.p))
    setKNNClassifierParametersValues(parameters, config)
    return parameters
  }

  estimator(
    x: DenseMatrix,
    y: YType,
    parameters: KNNClassifierF32MinkowskiF32Parameters,
  ): KNNClassifierF32I32MinkowskiF32 {
    const xAsF32 = x.asRsMatrix('f32') as DenseMatrixF32
    const yAsInt32 = yAsInt32Array(y)
    return KNNClassifierF32I32MinkowskiF32.fit(xAsF32, yAsInt32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): KNNClassifierF32I32MinkowskiF32 {
    return KNNClassifierF32I32MinkowskiF32.deserialize(data)
  }
}

export default KNNClassifierF32I32MinkowskiProvider
