import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DBSCANU16I32EuclidianU16,
  DBSCANU16EuclidianU16Parameters,
  DenseMatrixU16,
} from '../../../core-bindings/index.js'
import { type IDBSCANBaseParameters, setDBSCANParametersValues } from '../parameters.js'
import { type PredictorProvider } from '../../../estimator.js'

class DBSCANU16EuclidianU16Provider
  implements PredictorProvider<IDBSCANBaseParameters, DBSCANU16EuclidianU16Parameters, DBSCANU16I32EuclidianU16>
{
  parameters(config: IDBSCANBaseParameters): DBSCANU16EuclidianU16Parameters {
    const parameters = new DBSCANU16EuclidianU16Parameters()
    setDBSCANParametersValues(parameters, config)
    return parameters
  }

  estimator(x: InputType, _y: YType, parameters: DBSCANU16EuclidianU16Parameters): DBSCANU16I32EuclidianU16 {
    // TODO: Handle case where x is DataFrame
    const xAsU16 = (x as DenseMatrix).asRsMatrix('u16') as DenseMatrixU16
    return DBSCANU16I32EuclidianU16.fit(xAsU16, parameters)
  }

  toMatrix(x: InputType): DenseMatrixRs {
    // TODO: Handle case where x is DataFrame
    return (x as DenseMatrix).asRsMatrix('u16')
  }

  deserialize(data: Buffer): DBSCANU16I32EuclidianU16 {
    return DBSCANU16I32EuclidianU16.deserialize(data)
  }
}

export default DBSCANU16EuclidianU16Provider
