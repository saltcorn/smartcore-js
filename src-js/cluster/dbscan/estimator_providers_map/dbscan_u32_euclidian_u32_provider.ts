import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DBSCANU32I32EuclidianU32,
  DBSCANU32EuclidianU32Parameters,
  DenseMatrixU32,
} from '../../../core-bindings/index.js'
import { type IDBSCANBaseParameters, setDBSCANParametersValues } from '../parameters.js'
import { type PredictorProvider } from '../../../estimator.js'

class DBSCANU32EuclidianU32Provider
  implements PredictorProvider<IDBSCANBaseParameters, DBSCANU32EuclidianU32Parameters, DBSCANU32I32EuclidianU32>
{
  parameters(config: IDBSCANBaseParameters): DBSCANU32EuclidianU32Parameters {
    const parameters = new DBSCANU32EuclidianU32Parameters()
    setDBSCANParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, _y: YType, parameters: DBSCANU32EuclidianU32Parameters): DBSCANU32I32EuclidianU32 {
    const xAsU32 = x.asRsMatrix('u32') as DenseMatrixU32
    return DBSCANU32I32EuclidianU32.fit(xAsU32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('u32')
  }

  deserialize(data: Buffer): DBSCANU32I32EuclidianU32 {
    return DBSCANU32I32EuclidianU32.deserialize(data)
  }
}

export default DBSCANU32EuclidianU32Provider
