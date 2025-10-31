import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixU32,
  KNNClassifierU32I32ManhattanU32,
  KNNClassifierU32ManhattanU32Parameters,
  KNNClassifierU32EuclidianU32Parameters,
  ManhattanU32,
} from '../../../core-bindings/index.js'
import { type IKNNClassifierBaseParameters, setKNNClassifierParametersValues } from './index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { yAsInt32Array } from '../../../utilities/index.js'

class KNNClassifierU32I32ManhattanProvider
  implements
    PredictorProvider<
      IKNNClassifierBaseParameters,
      KNNClassifierU32ManhattanU32Parameters,
      KNNClassifierU32I32ManhattanU32
    >
{
  parameters(config: IKNNClassifierBaseParameters): KNNClassifierU32ManhattanU32Parameters {
    const parameters = new KNNClassifierU32EuclidianU32Parameters().withDistanceManhattanU32(new ManhattanU32())
    setKNNClassifierParametersValues(parameters, config)
    return parameters
  }

  estimator(
    x: DenseMatrix,
    y: YType,
    parameters: KNNClassifierU32ManhattanU32Parameters,
  ): KNNClassifierU32I32ManhattanU32 {
    const xAsU32 = x.asRsMatrix('u32') as DenseMatrixU32
    const yAsInt32 = yAsInt32Array(y)
    return KNNClassifierU32I32ManhattanU32.fit(xAsU32, yAsInt32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('u32')
  }

  deserialize(data: Buffer): KNNClassifierU32I32ManhattanU32 {
    return KNNClassifierU32I32ManhattanU32.deserialize(data)
  }
}

export default KNNClassifierU32I32ManhattanProvider
