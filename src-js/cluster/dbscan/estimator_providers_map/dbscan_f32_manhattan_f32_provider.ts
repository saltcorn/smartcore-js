import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DBSCANF32I32ManhattanF32,
  DBSCANF32EuclidianF32Parameters,
  DBSCANF32ManhattanF32Parameters,
  ManhattanF32,
  DenseMatrixF32,
} from '../../../core-bindings/index.js'
import { type IDBSCANBaseParameters, setDBSCANParametersValues } from '../parameters.js'
import { type PredictorProvider } from '../../../estimator.js'

class DBSCANF32ManhattanF32Provider
  implements PredictorProvider<IDBSCANBaseParameters, DBSCANF32ManhattanF32Parameters, DBSCANF32I32ManhattanF32>
{
  parameters(config: IDBSCANBaseParameters): DBSCANF32ManhattanF32Parameters {
    const parameters = new DBSCANF32EuclidianF32Parameters().withDistanceManhattanF32(new ManhattanF32())
    setDBSCANParametersValues(parameters, config)
    return parameters
  }

  estimator(x: InputType, _y: YType, parameters: DBSCANF32ManhattanF32Parameters): DBSCANF32I32ManhattanF32 {
    // TODO: Handle case where x is DataFrame
    const xAsF32 = (x as DenseMatrix).asRsMatrix('f32') as DenseMatrixF32
    return DBSCANF32I32ManhattanF32.fit(xAsF32, parameters)
  }

  toMatrix(x: InputType): DenseMatrixRs {
    // TODO: Handle case where x is DataFrame
    return (x as DenseMatrix).asRsMatrix('f32')
  }

  deserialize(data: Buffer): DBSCANF32I32ManhattanF32 {
    return DBSCANF32I32ManhattanF32.deserialize(data)
  }
}

export default DBSCANF32ManhattanF32Provider
