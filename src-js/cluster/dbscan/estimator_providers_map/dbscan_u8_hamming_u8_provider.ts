import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DBSCANU8EuclidianU8Parameters,
  DBSCANU8I32HammingU8,
  DBSCANU8HammingU8Parameters,
  HammingU8,
  DenseMatrixU8,
} from '../../../core-bindings/index.js'
import { type IDBSCANBaseParameters, setDBSCANParametersValues } from '../parameters.js'
import { type PredictorProvider } from '../../../estimator.js'

class DBSCANU8HammingU8Provider
  implements PredictorProvider<IDBSCANBaseParameters, DBSCANU8HammingU8Parameters, DBSCANU8I32HammingU8>
{
  parameters(config: IDBSCANBaseParameters): DBSCANU8HammingU8Parameters {
    const parameters = new DBSCANU8EuclidianU8Parameters().withDistanceHammingU8(new HammingU8())
    setDBSCANParametersValues(parameters, config)
    return parameters
  }

  estimator(x: InputType, _y: YType, parameters: DBSCANU8EuclidianU8Parameters): DBSCANU8I32HammingU8 {
    // TODO: Handle case where x is DataFrame
    const xAsU8 = (x as DenseMatrix).asRsMatrix('u8') as DenseMatrixU8
    return DBSCANU8I32HammingU8.fit(xAsU8, parameters)
  }

  toMatrix(x: InputType): DenseMatrixRs {
    // TODO: Handle case where x is DataFrame
    return (x as DenseMatrix).asRsMatrix('u8')
  }

  deserialize(data: Buffer): DBSCANU8I32HammingU8 {
    return DBSCANU8I32HammingU8.deserialize(data)
  }
}

export default DBSCANU8HammingU8Provider
