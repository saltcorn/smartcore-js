import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DBSCANI64I32MinkowskiI64,
  DBSCANI64EuclidianI64Parameters,
  DBSCANI64MinkowskiI64Parameters,
  MinkowskiI64,
  DenseMatrixI64,
} from '../../../core-bindings/index.js'
import { type IDBSCANBaseParameters, setDBSCANParametersValues } from '../parameters.js'
import { type PredictorProvider } from '../../../estimator.js'

class DBSCANI64MinkowskiI64Provider
  implements PredictorProvider<IDBSCANBaseParameters, DBSCANI64MinkowskiI64Parameters, DBSCANI64I32MinkowskiI64>
{
  parameters(config: IDBSCANBaseParameters): DBSCANI64MinkowskiI64Parameters {
    if (!config.p) {
      throw new Error(`Minkowski expects 'config.p' to be provided.`)
    }
    const parameters = new DBSCANI64EuclidianI64Parameters().withDistanceMinkowskiI64(new MinkowskiI64(config.p))
    setDBSCANParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, _y: YType, parameters: DBSCANI64MinkowskiI64Parameters): DBSCANI64I32MinkowskiI64 {
    const xAsI64 = x.asRsMatrix('i64') as DenseMatrixI64
    return DBSCANI64I32MinkowskiI64.fit(xAsI64, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('i64')
  }

  deserialize(data: Buffer): DBSCANI64I32MinkowskiI64 {
    return DBSCANI64I32MinkowskiI64.deserialize(data)
  }
}

export default DBSCANI64MinkowskiI64Provider
