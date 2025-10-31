import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixF32,
  KNNClassifierF32I32ManhattanF32,
  KNNClassifierF32ManhattanF32Parameters,
  KNNClassifierF32EuclidianF32Parameters,
  ManhattanF32,
} from '../../../core-bindings/index.js'
import { type IKNNClassifierBaseParameters, setKNNClassifierParametersValues } from './index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { yAsInt32Array } from '../../../utilities/index.js'

class KNNClassifierF32I32ManhattanProvider
  implements
    PredictorProvider<
      IKNNClassifierBaseParameters,
      KNNClassifierF32ManhattanF32Parameters,
      KNNClassifierF32I32ManhattanF32
    >
{
  parameters(config: IKNNClassifierBaseParameters): KNNClassifierF32ManhattanF32Parameters {
    const parameters = new KNNClassifierF32EuclidianF32Parameters().withDistanceManhattanF32(new ManhattanF32())
    setKNNClassifierParametersValues(parameters, config)
    return parameters
  }

  estimator(
    x: DenseMatrix,
    y: YType,
    parameters: KNNClassifierF32ManhattanF32Parameters,
  ): KNNClassifierF32I32ManhattanF32 {
    const xAsF32 = x.asRsMatrix('f32') as DenseMatrixF32
    const yAsInt32 = yAsInt32Array(y)
    return KNNClassifierF32I32ManhattanF32.fit(xAsF32, yAsInt32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): KNNClassifierF32I32ManhattanF32 {
    return KNNClassifierF32I32ManhattanF32.deserialize(data)
  }
}

export default KNNClassifierF32I32ManhattanProvider
