import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js'
import { converters } from '../../../linalg/dense-matrix/index.js'
import { DBSCANF64I32EuclidianF64, DBSCANF64EuclidianF64Parameters } from '../../../core-bindings/index.js'
import { type IDBSCANBaseParameters, setDBSCANParametersValues } from '../parameters.js'
import { type PredictorProvider } from '../../../estimator.js'

class DBSCANF64EuclidianF64Provider
  implements PredictorProvider<IDBSCANBaseParameters, DBSCANF64EuclidianF64Parameters, DBSCANF64I32EuclidianF64>
{
  parameters(config: IDBSCANBaseParameters): DBSCANF64EuclidianF64Parameters {
    const parameters = new DBSCANF64EuclidianF64Parameters()
    setDBSCANParametersValues(parameters, config)
    return parameters
  }

  estimator(x: InputType, _y: YType, parameters: DBSCANF64EuclidianF64Parameters): DBSCANF64I32EuclidianF64 {
    const xAsF64 = converters.toDenseMatrixF64(x)
    return DBSCANF64I32EuclidianF64.fit(xAsF64, parameters)
  }

  toMatrix(x: InputType): DenseMatrixRs {
    return converters.toDenseMatrixF64(x)
  }

  deserialize(data: Buffer): DBSCANF64I32EuclidianF64 {
    return DBSCANF64I32EuclidianF64.deserialize(data)
  }
}

export default DBSCANF64EuclidianF64Provider
