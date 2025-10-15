import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js'
import { converters } from '../../../linalg/dense-matrix/index.js'
import { DBSCANU8I32EuclidianU8, DBSCANU8EuclidianU8Parameters } from '../../../core-bindings/index.js'
import { type IDBSCANBaseParameters, setDBSCANParametersValues } from '../parameters.js'
import { type PredictorProvider } from '../../../estimator.js'

class DBSCANU8EuclidianU8Provider
  implements PredictorProvider<IDBSCANBaseParameters, DBSCANU8EuclidianU8Parameters, DBSCANU8I32EuclidianU8>
{
  parameters(config: IDBSCANBaseParameters): DBSCANU8EuclidianU8Parameters {
    const parameters = new DBSCANU8EuclidianU8Parameters()
    setDBSCANParametersValues(parameters, config)
    return parameters
  }

  estimator(x: InputType, _y: YType, parameters: DBSCANU8EuclidianU8Parameters): DBSCANU8I32EuclidianU8 {
    const xAsU8 = converters.toDenseMatrixU8(x)
    return DBSCANU8I32EuclidianU8.fit(xAsU8, parameters)
  }

  toMatrix(x: InputType): DenseMatrixRs {
    return converters.toDenseMatrixU8(x)
  }

  deserialize(data: Buffer): DBSCANU8I32EuclidianU8 {
    return DBSCANU8I32EuclidianU8.deserialize(data)
  }
}

export default DBSCANU8EuclidianU8Provider
