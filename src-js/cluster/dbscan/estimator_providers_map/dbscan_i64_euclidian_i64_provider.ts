import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DBSCANI64I32EuclidianI64,
  DBSCANI64EuclidianI64Parameters,
  DenseMatrixI64,
} from '../../../core-bindings/index.js'
import { type IDBSCANBaseParameters, setDBSCANParametersValues } from '../parameters.js'
import { type PredictorProvider } from '../../../estimator.js'

class DBSCANI64EuclidianI64Provider
  implements PredictorProvider<IDBSCANBaseParameters, DBSCANI64EuclidianI64Parameters, DBSCANI64I32EuclidianI64>
{
  parameters(config: IDBSCANBaseParameters): DBSCANI64EuclidianI64Parameters {
    const parameters = new DBSCANI64EuclidianI64Parameters()
    setDBSCANParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, _y: YType, parameters: DBSCANI64EuclidianI64Parameters): DBSCANI64I32EuclidianI64 {
    const xAsI64 = x.asRsMatrix('i64') as DenseMatrixI64
    return DBSCANI64I32EuclidianI64.fit(xAsI64, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('i64')
  }

  deserialize(data: Buffer): DBSCANI64I32EuclidianI64 {
    return DBSCANI64I32EuclidianI64.deserialize(data)
  }
}

export default DBSCANI64EuclidianI64Provider
