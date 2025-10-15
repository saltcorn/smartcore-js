import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js'
import { converters } from '../../../linalg/dense-matrix/index.js'
import {
  DBSCANU64I32ManhattanU64,
  DBSCANU64EuclidianU64Parameters,
  DBSCANU64ManhattanU64Parameters,
  ManhattanU64,
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
    const xAsU64 = converters.toDenseMatrixU64(x)
    return DBSCANU64I32ManhattanU64.fit(xAsU64, parameters)
  }

  toMatrix(x: InputType): DenseMatrixRs {
    return converters.toDenseMatrixU64(x)
  }

  deserialize(data: Buffer): DBSCANU64I32ManhattanU64 {
    return DBSCANU64I32ManhattanU64.deserialize(data)
  }
}

export default DBSCANU64ManhattanU64Provider
