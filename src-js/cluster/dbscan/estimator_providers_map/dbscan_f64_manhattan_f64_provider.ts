import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js'
import { converters } from '../../../linalg/dense-matrix/index.js'
import {
  DBSCANF64I32ManhattanF64,
  DBSCANF64EuclidianF64Parameters,
  DBSCANF64ManhattanF64Parameters,
  ManhattanF64,
} from '../../../core-bindings/index.js'
import { type IDBSCANBaseParameters, setDBSCANParametersValues } from '../parameters.js'
import { type PredictorProvider } from '../../../estimator.js'

class DBSCANF64ManhattanF64Provider
  implements PredictorProvider<IDBSCANBaseParameters, DBSCANF64ManhattanF64Parameters, DBSCANF64I32ManhattanF64>
{
  parameters(config: IDBSCANBaseParameters): DBSCANF64ManhattanF64Parameters {
    const parameters = new DBSCANF64EuclidianF64Parameters().withDistanceManhattanF64(new ManhattanF64())
    setDBSCANParametersValues(parameters, config)
    return parameters
  }

  estimator(x: InputType, _y: YType, parameters: DBSCANF64ManhattanF64Parameters): DBSCANF64I32ManhattanF64 {
    const xAsF64 = converters.toDenseMatrixF64(x)
    return DBSCANF64I32ManhattanF64.fit(xAsF64, parameters)
  }

  toMatrix(x: InputType): DenseMatrixRs {
    return converters.toDenseMatrixF64(x)
  }

  deserialize(data: Buffer): DBSCANF64I32ManhattanF64 {
    return DBSCANF64I32ManhattanF64.deserialize(data)
  }
}

export default DBSCANF64ManhattanF64Provider
