import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixF64,
  KNNClassifierF64I32MinkowskiF64,
  KNNClassifierF64MinkowskiF64Parameters,
  KNNClassifierF64EuclidianF64Parameters,
  MinkowskiF64,
} from '../../../core-bindings/index.js'
import { type IKNNClassifierBaseParameters, setKNNClassifierParametersValues } from './index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { yAsInt32Array } from '../../../utilities/index.js'

interface ManhattanParameters extends IKNNClassifierBaseParameters {
  p: number
}

class KNNClassifierF64I32MinkowskiProvider
  implements
    PredictorProvider<
      IKNNClassifierBaseParameters,
      KNNClassifierF64MinkowskiF64Parameters,
      KNNClassifierF64I32MinkowskiF64
    >
{
  parameters(config: ManhattanParameters): KNNClassifierF64MinkowskiF64Parameters {
    const parameters = new KNNClassifierF64EuclidianF64Parameters().withDistanceMinkowskiF64(new MinkowskiF64(config.p))
    setKNNClassifierParametersValues(parameters, config)
    return parameters
  }

  estimator(
    x: DenseMatrix,
    y: YType,
    parameters: KNNClassifierF64MinkowskiF64Parameters,
  ): KNNClassifierF64I32MinkowskiF64 {
    const xAsF64 = x.asRsMatrix('f64') as DenseMatrixF64
    const yAsInt32 = yAsInt32Array(y)
    return KNNClassifierF64I32MinkowskiF64.fit(xAsF64, yAsInt32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f64')
  }

  deserialize(data: Buffer): KNNClassifierF64I32MinkowskiF64 {
    return KNNClassifierF64I32MinkowskiF64.deserialize(data)
  }
}

export default KNNClassifierF64I32MinkowskiProvider
