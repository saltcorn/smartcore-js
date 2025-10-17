import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DBSCANI32I32ManhattanI32,
  DBSCANI32EuclidianI32Parameters,
  DBSCANI32ManhattanI32Parameters,
  ManhattanI32,
  DenseMatrixI32,
} from '../../../core-bindings/index.js'
import { type IDBSCANBaseParameters, setDBSCANParametersValues } from '../parameters.js'
import { type PredictorProvider } from '../../../estimator.js'

class DBSCANI32ManhattanI32Provider
  implements PredictorProvider<IDBSCANBaseParameters, DBSCANI32ManhattanI32Parameters, DBSCANI32I32ManhattanI32>
{
  parameters(config: IDBSCANBaseParameters): DBSCANI32ManhattanI32Parameters {
    const parameters = new DBSCANI32EuclidianI32Parameters().withDistanceManhattanI32(new ManhattanI32())
    setDBSCANParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, _y: YType, parameters: DBSCANI32ManhattanI32Parameters): DBSCANI32I32ManhattanI32 {
    const xAsI32 = x.asRsMatrix('i32') as DenseMatrixI32
    return DBSCANI32I32ManhattanI32.fit(xAsI32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('i32')
  }

  deserialize(data: Buffer): DBSCANI32I32ManhattanI32 {
    return DBSCANI32I32ManhattanI32.deserialize(data)
  }
}

export default DBSCANI32ManhattanI32Provider
