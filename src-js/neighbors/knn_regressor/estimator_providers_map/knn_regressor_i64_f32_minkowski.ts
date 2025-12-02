import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixI64,
  KNNRegressorI64F32MinkowskiI64,
  KNNRegressorI64MinkowskiI64Parameters,
  KNNRegressorI64EuclidianI64Parameters,
  MinkowskiI64,
} from '../../../core-bindings/index.js'
import { type IKNNRegressorBaseParameters, type MinkowskiParameters, setKNNRegressorParametersValues } from './index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { yAsFloat32Array } from '../../../utilities/index.js'

class KNNRegressorI64I64MinkowskiProvider
  implements
    PredictorProvider<
      IKNNRegressorBaseParameters,
      KNNRegressorI64MinkowskiI64Parameters,
      KNNRegressorI64F32MinkowskiI64
    >
{
  parameters(config: MinkowskiParameters): KNNRegressorI64MinkowskiI64Parameters {
    const parameters = new KNNRegressorI64EuclidianI64Parameters().withDistanceMinkowskiI64(new MinkowskiI64(config.p))
    setKNNRegressorParametersValues(parameters, config)
    return parameters
  }

  estimator(
    x: DenseMatrix,
    y: YType,
    parameters: KNNRegressorI64MinkowskiI64Parameters,
  ): KNNRegressorI64F32MinkowskiI64 {
    const xAsI64 = x.asRsMatrix('i64') as DenseMatrixI64
    const yAsFloat32 = yAsFloat32Array(y)
    return KNNRegressorI64F32MinkowskiI64.fit(xAsI64, yAsFloat32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('i64')
  }

  deserialize(data: Buffer): KNNRegressorI64F32MinkowskiI64 {
    return KNNRegressorI64F32MinkowskiI64.deserialize(data)
  }
}

export default KNNRegressorI64I64MinkowskiProvider
