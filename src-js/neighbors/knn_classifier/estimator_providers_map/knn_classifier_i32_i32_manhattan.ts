import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixI32,
  KNNClassifierI32I32ManhattanI32,
  KNNClassifierI32ManhattanI32Parameters,
  KNNClassifierI32EuclidianI32Parameters,
  ManhattanI32,
} from '../../../core-bindings/index.js'
import { type IKNNClassifierBaseParameters, setKNNClassifierParametersValues } from './index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { yAsInt32Array } from '../../../utilities/index.js'

class KNNClassifierI32I32ManhattanProvider
  implements
    PredictorProvider<
      IKNNClassifierBaseParameters,
      KNNClassifierI32ManhattanI32Parameters,
      KNNClassifierI32I32ManhattanI32
    >
{
  parameters(config: IKNNClassifierBaseParameters): KNNClassifierI32ManhattanI32Parameters {
    const parameters = new KNNClassifierI32EuclidianI32Parameters().withDistanceManhattanI32(new ManhattanI32())
    setKNNClassifierParametersValues(parameters, config)
    return parameters
  }

  estimator(
    x: DenseMatrix,
    y: YType,
    parameters: KNNClassifierI32ManhattanI32Parameters,
  ): KNNClassifierI32I32ManhattanI32 {
    const xAsI32 = x.asRsMatrix('i32') as DenseMatrixI32
    const yAsInt32 = yAsInt32Array(y)
    return KNNClassifierI32I32ManhattanI32.fit(xAsI32, yAsInt32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('i32')
  }

  deserialize(data: Buffer): KNNClassifierI32I32ManhattanI32 {
    return KNNClassifierI32I32ManhattanI32.deserialize(data)
  }
}

export default KNNClassifierI32I32ManhattanProvider
