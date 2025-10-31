import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixF64,
  KNNRegressorF64F32ManhattanF64,
  KNNRegressorF64ManhattanF64Parameters,
  KNNRegressorF64EuclidianF64Parameters,
  ManhattanF64,
} from '../../../core-bindings/index.js'
import { type IKNNRegressorBaseParameters, setKNNRegressorParametersValues } from './index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { yAsFloat32Array } from '../../../utilities/index.js'

class KNNRegressorF64F32ManhattanProvider
  implements
    PredictorProvider<
      IKNNRegressorBaseParameters,
      KNNRegressorF64ManhattanF64Parameters,
      KNNRegressorF64F32ManhattanF64
    >
{
  parameters(config: IKNNRegressorBaseParameters): KNNRegressorF64ManhattanF64Parameters {
    const parameters = new KNNRegressorF64EuclidianF64Parameters().withDistanceManhattanF64(new ManhattanF64())
    setKNNRegressorParametersValues(parameters, config)
    return parameters
  }

  estimator(
    x: DenseMatrix,
    y: YType,
    parameters: KNNRegressorF64ManhattanF64Parameters,
  ): KNNRegressorF64F32ManhattanF64 {
    const xAsF64 = x.asRsMatrix('f64') as DenseMatrixF64
    const yAsFloat32 = yAsFloat32Array(y)
    return KNNRegressorF64F32ManhattanF64.fit(xAsF64, yAsFloat32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f64')
  }

  deserialize(data: Buffer): KNNRegressorF64F32ManhattanF64 {
    return KNNRegressorF64F32ManhattanF64.deserialize(data)
  }
}

export default KNNRegressorF64F32ManhattanProvider
