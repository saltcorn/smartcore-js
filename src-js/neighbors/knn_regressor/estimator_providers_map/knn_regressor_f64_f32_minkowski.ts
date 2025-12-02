import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixF64,
  KNNRegressorF64F32MinkowskiF64,
  KNNRegressorF64MinkowskiF64Parameters,
  KNNRegressorF64EuclidianF64Parameters,
  MinkowskiF64,
} from '../../../core-bindings/index.js'
import { type IKNNRegressorBaseParameters, type MinkowskiParameters, setKNNRegressorParametersValues } from './index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { yAsFloat32Array } from '../../../utilities/index.js'

class KNNRegressorF64F32MinkowskiProvider
  implements
    PredictorProvider<
      IKNNRegressorBaseParameters,
      KNNRegressorF64MinkowskiF64Parameters,
      KNNRegressorF64F32MinkowskiF64
    >
{
  parameters(config: MinkowskiParameters): KNNRegressorF64MinkowskiF64Parameters {
    const parameters = new KNNRegressorF64EuclidianF64Parameters().withDistanceMinkowskiF64(new MinkowskiF64(config.p))
    setKNNRegressorParametersValues(parameters, config)
    return parameters
  }

  estimator(
    x: DenseMatrix,
    y: YType,
    parameters: KNNRegressorF64MinkowskiF64Parameters,
  ): KNNRegressorF64F32MinkowskiF64 {
    const xAsF64 = x.asRsMatrix('f64') as DenseMatrixF64
    const yAsFloat32 = yAsFloat32Array(y)
    return KNNRegressorF64F32MinkowskiF64.fit(xAsF64, yAsFloat32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f64')
  }

  deserialize(data: Buffer): KNNRegressorF64F32MinkowskiF64 {
    return KNNRegressorF64F32MinkowskiF64.deserialize(data)
  }
}

export default KNNRegressorF64F32MinkowskiProvider
