import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js'
import { converters } from '../../../linalg/dense-matrix/index.js'
import { DBSCANI32I32EuclidianI32, DBSCANI32EuclidianI32Parameters } from '../../../core-bindings/index.js'
import { type IDBSCANBaseParameters, setDBSCANParametersValues } from '../parameters.js'
import { type PredictorProvider } from '../../../estimator.js'

class DBSCANI32EuclidianI32Provider
  implements PredictorProvider<IDBSCANBaseParameters, DBSCANI32EuclidianI32Parameters, DBSCANI32I32EuclidianI32>
{
  parameters(config: IDBSCANBaseParameters): DBSCANI32EuclidianI32Parameters {
    const parameters = new DBSCANI32EuclidianI32Parameters()
    setDBSCANParametersValues(parameters, config)
    return parameters
  }

  estimator(x: InputType, _y: YType, parameters: DBSCANI32EuclidianI32Parameters): DBSCANI32I32EuclidianI32 {
    const xAsI32 = converters.toDenseMatrixI32(x)
    return DBSCANI32I32EuclidianI32.fit(xAsI32, parameters)
  }

  toMatrix(x: InputType): DenseMatrixRs {
    return converters.toDenseMatrixI32(x)
  }

  deserialize(data: Buffer): DBSCANI32I32EuclidianI32 {
    return DBSCANI32I32EuclidianI32.deserialize(data)
  }
}

export default DBSCANI32EuclidianI32Provider
