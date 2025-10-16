import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DBSCANU16EuclidianU16Parameters,
  DBSCANU16I32HammingU16,
  DBSCANU16HammingU16Parameters,
  HammingU16,
  DenseMatrixU16,
} from '../../../core-bindings/index.js'
import { type IDBSCANBaseParameters, setDBSCANParametersValues } from '../parameters.js'
import { type PredictorProvider } from '../../../estimator.js'

class DBSCANU16HammingU16Provider
  implements PredictorProvider<IDBSCANBaseParameters, DBSCANU16HammingU16Parameters, DBSCANU16I32HammingU16>
{
  parameters(config: IDBSCANBaseParameters): DBSCANU16HammingU16Parameters {
    const parameters = new DBSCANU16EuclidianU16Parameters().withDistanceHammingU16(new HammingU16())
    setDBSCANParametersValues(parameters, config)
    return parameters
  }

  estimator(x: InputType, _y: YType, parameters: DBSCANU16EuclidianU16Parameters): DBSCANU16I32HammingU16 {
    // TODO: Handle case where x is DataFrame
    const xAsU16 = (x as DenseMatrix).asRsMatrix('u16') as DenseMatrixU16
    return DBSCANU16I32HammingU16.fit(xAsU16, parameters)
  }

  toMatrix(x: InputType): DenseMatrixRs {
    // TODO: Handle case where x is DataFrame
    return (x as DenseMatrix).asRsMatrix('u16')
  }

  deserialize(data: Buffer): DBSCANU16I32HammingU16 {
    return DBSCANU16I32HammingU16.deserialize(data)
  }
}

export default DBSCANU16HammingU16Provider
