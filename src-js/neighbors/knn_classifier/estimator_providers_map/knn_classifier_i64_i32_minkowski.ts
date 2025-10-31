import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixI64,
  KNNClassifierI64I32MinkowskiI64,
  KNNClassifierI64MinkowskiI64Parameters,
  KNNClassifierI64EuclidianI64Parameters,
  MinkowskiI64,
} from '../../../core-bindings/index.js'
import { type IKNNClassifierBaseParameters, setKNNClassifierParametersValues } from './index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { yAsInt32Array } from '../../../utilities/index.js'

interface ManhattanParameters extends IKNNClassifierBaseParameters {
  p: number
}

class KNNClassifierI64I64MinkowskiProvider
  implements
    PredictorProvider<
      IKNNClassifierBaseParameters,
      KNNClassifierI64MinkowskiI64Parameters,
      KNNClassifierI64I32MinkowskiI64
    >
{
  parameters(config: ManhattanParameters): KNNClassifierI64MinkowskiI64Parameters {
    const parameters = new KNNClassifierI64EuclidianI64Parameters().withDistanceMinkowskiI64(new MinkowskiI64(config.p))
    setKNNClassifierParametersValues(parameters, config)
    return parameters
  }

  estimator(
    x: DenseMatrix,
    y: YType,
    parameters: KNNClassifierI64MinkowskiI64Parameters,
  ): KNNClassifierI64I32MinkowskiI64 {
    const xAsI64 = x.asRsMatrix('i64') as DenseMatrixI64
    const yAsInt32 = yAsInt32Array(y)
    return KNNClassifierI64I32MinkowskiI64.fit(xAsI64, yAsInt32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('i64')
  }

  deserialize(data: Buffer): KNNClassifierI64I32MinkowskiI64 {
    return KNNClassifierI64I32MinkowskiI64.deserialize(data)
  }
}

export default KNNClassifierI64I64MinkowskiProvider
