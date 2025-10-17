import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DBSCANU64I32EuclidianU64,
  DBSCANU64EuclidianU64Parameters,
  DenseMatrixU64,
} from '../../../core-bindings/index.js'
import { type IDBSCANBaseParameters, setDBSCANParametersValues } from '../parameters.js'
import { type PredictorProvider } from '../../../estimator.js'

class DBSCANU64EuclidianU64Provider
  implements PredictorProvider<IDBSCANBaseParameters, DBSCANU64EuclidianU64Parameters, DBSCANU64I32EuclidianU64>
{
  parameters(config: IDBSCANBaseParameters): DBSCANU64EuclidianU64Parameters {
    const parameters = new DBSCANU64EuclidianU64Parameters()
    setDBSCANParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, _y: YType, parameters: DBSCANU64EuclidianU64Parameters): DBSCANU64I32EuclidianU64 {
    const xAsU64 = x.asRsMatrix('u64') as DenseMatrixU64
    return DBSCANU64I32EuclidianU64.fit(xAsU64, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('u64')
  }

  deserialize(data: Buffer): DBSCANU64I32EuclidianU64 {
    return DBSCANU64I32EuclidianU64.deserialize(data)
  }
}

export default DBSCANU64EuclidianU64Provider
