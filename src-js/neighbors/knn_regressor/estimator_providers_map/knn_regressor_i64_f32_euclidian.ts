import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DenseMatrixI64,
  KNNRegressorI64F32EuclidianI64,
  KNNRegressorI64EuclidianI64Parameters,
} from '../../../core-bindings/index.js'
import { type IKNNRegressorBaseParameters, setKNNRegressorParametersValues } from './index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { yAsFloat32Array } from '../../../utilities/index.js'

class KNNRegressorI64F32EuclidianProvider
  implements
    PredictorProvider<
      IKNNRegressorBaseParameters,
      KNNRegressorI64EuclidianI64Parameters,
      KNNRegressorI64F32EuclidianI64
    >
{
  parameters(config: IKNNRegressorBaseParameters): KNNRegressorI64EuclidianI64Parameters {
    const parameters = new KNNRegressorI64EuclidianI64Parameters()
    setKNNRegressorParametersValues(parameters, config)
    return parameters
  }

  estimator(
    x: DenseMatrix,
    y: YType,
    parameters: KNNRegressorI64EuclidianI64Parameters,
  ): KNNRegressorI64F32EuclidianI64 {
    const xAsI64 = x.asRsMatrix('i64') as DenseMatrixI64
    const yAsFloat32 = yAsFloat32Array(y)
    return KNNRegressorI64F32EuclidianI64.fit(xAsI64, yAsFloat32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('i64')
  }

  deserialize(data: Buffer): KNNRegressorI64F32EuclidianI64 {
    return KNNRegressorI64F32EuclidianI64.deserialize(data)
  }
}

export default KNNRegressorI64F32EuclidianProvider
