import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixU32,
  KNNRegressorU32F32ManhattanU32,
  KNNRegressorU32ManhattanU32Parameters,
  KNNRegressorU32EuclidianU32Parameters,
  ManhattanU32,
} from '../../../core-bindings/index.js'
import { type IKNNRegressorBaseParameters, setKNNRegressorParametersValues } from './index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { yAsFloat32Array } from '../../../utilities/index.js'

class KNNRegressorU32F32ManhattanProvider
  implements
    PredictorProvider<
      IKNNRegressorBaseParameters,
      KNNRegressorU32ManhattanU32Parameters,
      KNNRegressorU32F32ManhattanU32
    >
{
  parameters(config: IKNNRegressorBaseParameters): KNNRegressorU32ManhattanU32Parameters {
    const parameters = new KNNRegressorU32EuclidianU32Parameters().withDistanceManhattanU32(new ManhattanU32())
    setKNNRegressorParametersValues(parameters, config)
    return parameters
  }

  estimator(
    x: DenseMatrix,
    y: YType,
    parameters: KNNRegressorU32ManhattanU32Parameters,
  ): KNNRegressorU32F32ManhattanU32 {
    const xAsU32 = x.asRsMatrix('u32') as DenseMatrixU32
    const yAsFloat32 = yAsFloat32Array(y)
    return KNNRegressorU32F32ManhattanU32.fit(xAsU32, yAsFloat32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('u32')
  }

  deserialize(data: Buffer): KNNRegressorU32F32ManhattanU32 {
    return KNNRegressorU32F32ManhattanU32.deserialize(data)
  }
}

export default KNNRegressorU32F32ManhattanProvider
