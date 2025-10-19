import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DBSCANF32I32EuclidianF32,
  DBSCANF32EuclidianF32Parameters,
  DenseMatrixF32,
} from '../../../core-bindings/index.js'
import { type IDBSCANBaseParameters, setDBSCANParametersValues } from '../parameters.js'
import { type PredictorProvider } from '../../../estimator.js'

class DBSCANF32EuclidianF32Provider
  implements PredictorProvider<IDBSCANBaseParameters, DBSCANF32EuclidianF32Parameters, DBSCANF32I32EuclidianF32>
{
  parameters(config: IDBSCANBaseParameters): DBSCANF32EuclidianF32Parameters {
    const parameters = new DBSCANF32EuclidianF32Parameters()
    setDBSCANParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, _y: YType, parameters: DBSCANF32EuclidianF32Parameters): DBSCANF32I32EuclidianF32 {
    const xAsF32 = x.asRsMatrix('f32') as DenseMatrixF32
    return DBSCANF32I32EuclidianF32.fit(xAsF32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): DBSCANF32I32EuclidianF32 {
    return DBSCANF32I32EuclidianF32.deserialize(data)
  }
}

export default DBSCANF32EuclidianF32Provider
