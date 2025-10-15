import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js'
import { converters } from '../../../linalg/dense-matrix/index.js'
import { DBSCANI64I32EuclidianI64, DBSCANI64EuclidianI64Parameters } from '../../../core-bindings/index.js'
import { type IDBSCANBaseParameters, setDBSCANParametersValues } from '../parameters.js'
import { type PredictorProvider } from '../../../estimator.js'

class DBSCANI64EuclidianI64Provider
  implements PredictorProvider<IDBSCANBaseParameters, DBSCANI64EuclidianI64Parameters, DBSCANI64I32EuclidianI64>
{
  parameters(config: IDBSCANBaseParameters): DBSCANI64EuclidianI64Parameters {
    const parameters = new DBSCANI64EuclidianI64Parameters()
    setDBSCANParametersValues(parameters, config)
    return parameters
  }

  estimator(x: InputType, _y: YType, parameters: DBSCANI64EuclidianI64Parameters): DBSCANI64I32EuclidianI64 {
    const xAsI64 = converters.toDenseMatrixI64(x)
    return DBSCANI64I32EuclidianI64.fit(xAsI64, parameters)
  }

  toMatrix(x: InputType): DenseMatrixRs {
    return converters.toDenseMatrixI64(x)
  }

  deserialize(data: Buffer): DBSCANI64I32EuclidianI64 {
    return DBSCANI64I32EuclidianI64.deserialize(data)
  }
}

export default DBSCANI64EuclidianI64Provider
