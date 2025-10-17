import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DBSCANI32I32MinkowskiI32,
  DBSCANI32EuclidianI32Parameters,
  DBSCANI32MinkowskiI32Parameters,
  MinkowskiI32,
  DenseMatrixI32,
} from '../../../core-bindings/index.js'
import { type IDBSCANBaseParameters, setDBSCANParametersValues } from '../parameters.js'
import { type PredictorProvider } from '../../../estimator.js'

class DBSCANI32MinkowskiI32Provider
  implements PredictorProvider<IDBSCANBaseParameters, DBSCANI32MinkowskiI32Parameters, DBSCANI32I32MinkowskiI32>
{
  parameters(config: IDBSCANBaseParameters): DBSCANI32MinkowskiI32Parameters {
    if (!config.p) {
      throw new Error(`Minkowski expects 'config.p' to be provided.`)
    }
    const parameters = new DBSCANI32EuclidianI32Parameters().withDistanceMinkowskiI32(new MinkowskiI32(config.p))
    setDBSCANParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, _y: YType, parameters: DBSCANI32MinkowskiI32Parameters): DBSCANI32I32MinkowskiI32 {
    const xAsI32 = x.asRsMatrix('i32') as DenseMatrixI32
    return DBSCANI32I32MinkowskiI32.fit(xAsI32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('i32')
  }

  deserialize(data: Buffer): DBSCANI32I32MinkowskiI32 {
    return DBSCANI32I32MinkowskiI32.deserialize(data)
  }
}

export default DBSCANI32MinkowskiI32Provider
