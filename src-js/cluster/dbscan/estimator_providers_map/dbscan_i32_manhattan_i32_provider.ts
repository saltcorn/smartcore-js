import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js'
import { converters } from '../../../linalg/dense-matrix/index.js'
import {
  DBSCANI32I32ManhattanI32,
  DBSCANI32EuclidianI32Parameters,
  DBSCANI32ManhattanI32Parameters,
  ManhattanI32,
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

  estimator(x: InputType, _y: YType, parameters: DBSCANI32ManhattanI32Parameters): DBSCANI32I32ManhattanI32 {
    const xAsI32 = converters.toDenseMatrixI32(x)
    return DBSCANI32I32ManhattanI32.fit(xAsI32, parameters)
  }

  toMatrix(x: InputType): DenseMatrixRs {
    return converters.toDenseMatrixI32(x)
  }

  deserialize(data: Buffer): DBSCANI32I32ManhattanI32 {
    return DBSCANI32I32ManhattanI32.deserialize(data)
  }
}

export default DBSCANI32ManhattanI32Provider
