import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixI32,
  KNNClassifierI32I32MinkowskiI32,
  KNNClassifierI32MinkowskiI32Parameters,
  KNNClassifierI32EuclidianI32Parameters,
  MinkowskiI32,
} from '../../../core-bindings/index.js'
import { type IKNNClassifierBaseParameters, setKNNClassifierParametersValues } from './index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { yAsInt32Array } from '../../../utilities/index.js'

interface ManhattanParameters extends IKNNClassifierBaseParameters {
  p: number
}

class KNNClassifierI32I32MinkowskiProvider
  implements
    PredictorProvider<
      IKNNClassifierBaseParameters,
      KNNClassifierI32MinkowskiI32Parameters,
      KNNClassifierI32I32MinkowskiI32
    >
{
  parameters(config: ManhattanParameters): KNNClassifierI32MinkowskiI32Parameters {
    const parameters = new KNNClassifierI32EuclidianI32Parameters().withDistanceMinkowskiI32(new MinkowskiI32(config.p))
    setKNNClassifierParametersValues(parameters, config)
    return parameters
  }

  estimator(
    x: DenseMatrix,
    y: YType,
    parameters: KNNClassifierI32MinkowskiI32Parameters,
  ): KNNClassifierI32I32MinkowskiI32 {
    const xAsI32 = x.asRsMatrix('i32') as DenseMatrixI32
    const yAsInt32 = yAsInt32Array(y)
    return KNNClassifierI32I32MinkowskiI32.fit(xAsI32, yAsInt32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('i32')
  }

  deserialize(data: Buffer): KNNClassifierI32I32MinkowskiI32 {
    return KNNClassifierI32I32MinkowskiI32.deserialize(data)
  }
}

export default KNNClassifierI32I32MinkowskiProvider
