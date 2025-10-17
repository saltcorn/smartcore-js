import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DBSCANF64I32EuclidianF64,
  DBSCANF64EuclidianF64Parameters,
  DenseMatrixF64,
} from '../../../core-bindings/index.js'
import { type IDBSCANBaseParameters, setDBSCANParametersValues } from '../parameters.js'
import { type PredictorProvider } from '../../../estimator.js'

class DBSCANF64EuclidianF64Provider
  implements PredictorProvider<IDBSCANBaseParameters, DBSCANF64EuclidianF64Parameters, DBSCANF64I32EuclidianF64>
{
  parameters(config: IDBSCANBaseParameters): DBSCANF64EuclidianF64Parameters {
    const parameters = new DBSCANF64EuclidianF64Parameters()
    setDBSCANParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, _y: YType, parameters: DBSCANF64EuclidianF64Parameters): DBSCANF64I32EuclidianF64 {
    const xAsF64 = x.asRsMatrix('f64') as DenseMatrixF64
    return DBSCANF64I32EuclidianF64.fit(xAsF64, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f64')
  }

  deserialize(data: Buffer): DBSCANF64I32EuclidianF64 {
    return DBSCANF64I32EuclidianF64.deserialize(data)
  }
}

export default DBSCANF64EuclidianF64Provider
