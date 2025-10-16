import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DBSCANU64I32ManhattanU64,
  DBSCANU64EuclidianU64Parameters,
  DBSCANU64ManhattanU64Parameters,
  ManhattanU64,
  DenseMatrixU64,
} from '../../../core-bindings/index.js'
import { type IDBSCANBaseParameters, setDBSCANParametersValues } from '../parameters.js'
import { type PredictorProvider } from '../../../estimator.js'

class DBSCANU64ManhattanU64Provider
  implements PredictorProvider<IDBSCANBaseParameters, DBSCANU64ManhattanU64Parameters, DBSCANU64I32ManhattanU64>
{
  parameters(config: IDBSCANBaseParameters): DBSCANU64ManhattanU64Parameters {
    const parameters = new DBSCANU64EuclidianU64Parameters().withDistanceManhattanU64(new ManhattanU64())
    setDBSCANParametersValues(parameters, config)
    return parameters
  }

  estimator(x: InputType, _y: YType, parameters: DBSCANU64ManhattanU64Parameters): DBSCANU64I32ManhattanU64 {
    // TODO: Handle case where x is DataFrame
    const xAsU64 = (x as DenseMatrix).asRsMatrix('u64') as DenseMatrixU64
    return DBSCANU64I32ManhattanU64.fit(xAsU64, parameters)
  }

  toMatrix(x: InputType): DenseMatrixRs {
    // TODO: Handle case where x is DataFrame
    return (x as DenseMatrix).asRsMatrix('u64')
  }

  deserialize(data: Buffer): DBSCANU64I32ManhattanU64 {
    return DBSCANU64I32ManhattanU64.deserialize(data)
  }
}

export default DBSCANU64ManhattanU64Provider
