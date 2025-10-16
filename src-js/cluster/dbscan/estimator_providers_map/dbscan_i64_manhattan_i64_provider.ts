import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DBSCANI64I32ManhattanI64,
  DBSCANI64EuclidianI64Parameters,
  DBSCANI64ManhattanI64Parameters,
  ManhattanI64,
  DenseMatrixI64,
} from '../../../core-bindings/index.js'
import { type IDBSCANBaseParameters, setDBSCANParametersValues } from '../parameters.js'
import { type PredictorProvider } from '../../../estimator.js'

class DBSCANI64ManhattanI64Provider
  implements PredictorProvider<IDBSCANBaseParameters, DBSCANI64ManhattanI64Parameters, DBSCANI64I32ManhattanI64>
{
  parameters(config: IDBSCANBaseParameters): DBSCANI64ManhattanI64Parameters {
    const parameters = new DBSCANI64EuclidianI64Parameters().withDistanceManhattanI64(new ManhattanI64())
    setDBSCANParametersValues(parameters, config)
    return parameters
  }

  estimator(x: InputType, _y: YType, parameters: DBSCANI64ManhattanI64Parameters): DBSCANI64I32ManhattanI64 {
    // TODO: Handle case where x is DataFrame
    const xAsI64 = (x as DenseMatrix).asRsMatrix('i64') as DenseMatrixI64
    return DBSCANI64I32ManhattanI64.fit(xAsI64, parameters)
  }

  toMatrix(x: InputType): DenseMatrixRs {
    // TODO: Handle case where x is DataFrame
    return (x as DenseMatrix).asRsMatrix('i64')
  }

  deserialize(data: Buffer): DBSCANI64I32ManhattanI64 {
    return DBSCANI64I32ManhattanI64.deserialize(data)
  }
}

export default DBSCANI64ManhattanI64Provider
