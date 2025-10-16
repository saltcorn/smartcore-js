import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DBSCANF64I32MinkowskiF64,
  DBSCANF64EuclidianF64Parameters,
  DBSCANF64MinkowskiF64Parameters,
  MinkowskiF64,
  DenseMatrixF64,
} from '../../../core-bindings/index.js'
import { type IDBSCANBaseParameters, setDBSCANParametersValues } from '../parameters.js'
import { type PredictorProvider } from '../../../estimator.js'

class DBSCANF64MinkowskiF64Provider
  implements PredictorProvider<IDBSCANBaseParameters, DBSCANF64MinkowskiF64Parameters, DBSCANF64I32MinkowskiF64>
{
  parameters(config: IDBSCANBaseParameters): DBSCANF64MinkowskiF64Parameters {
    if (!config.p) {
      throw new Error(`Minkowski expects 'config.p' to be provided.`)
    }
    const parameters = new DBSCANF64EuclidianF64Parameters().withDistanceMinkowskiF64(new MinkowskiF64(config.p))
    setDBSCANParametersValues(parameters, config)
    return parameters
  }

  estimator(x: InputType, _y: YType, parameters: DBSCANF64MinkowskiF64Parameters): DBSCANF64I32MinkowskiF64 {
    // TODO: Handle case where x is DataFrame
    const xAsF64 = (x as DenseMatrix).asRsMatrix('f64') as DenseMatrixF64
    return DBSCANF64I32MinkowskiF64.fit(xAsF64, parameters)
  }

  toMatrix(x: InputType): DenseMatrixRs {
    // TODO: Handle case where x is DataFrame
    return (x as DenseMatrix).asRsMatrix('f64')
  }

  deserialize(data: Buffer): DBSCANF64I32MinkowskiF64 {
    return DBSCANF64I32MinkowskiF64.deserialize(data)
  }
}

export default DBSCANF64MinkowskiF64Provider
