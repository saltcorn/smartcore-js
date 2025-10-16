import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DBSCANF32I32MinkowskiF32,
  DBSCANF32EuclidianF32Parameters,
  DBSCANF32MinkowskiF32Parameters,
  MinkowskiF32,
  DenseMatrixF32,
} from '../../../core-bindings/index.js'
import { type IDBSCANBaseParameters, setDBSCANParametersValues } from '../parameters.js'
import { type PredictorProvider } from '../../../estimator.js'

class DBSCANF32MinkowskiF32Provider
  implements PredictorProvider<IDBSCANBaseParameters, DBSCANF32MinkowskiF32Parameters, DBSCANF32I32MinkowskiF32>
{
  parameters(config: IDBSCANBaseParameters): DBSCANF32MinkowskiF32Parameters {
    if (!config.p) {
      throw new Error(`Minkowski expects 'config.p' to be provided.`)
    }
    const parameters = new DBSCANF32EuclidianF32Parameters().withDistanceMinkowskiF32(new MinkowskiF32(config.p))
    setDBSCANParametersValues(parameters, config)
    return parameters
  }

  estimator(x: InputType, _y: YType, parameters: DBSCANF32MinkowskiF32Parameters): DBSCANF32I32MinkowskiF32 {
    // TODO: Handle case where x is DataFrame
    const xAsF32 = (x as DenseMatrix).asRsMatrix('f32') as DenseMatrixF32
    return DBSCANF32I32MinkowskiF32.fit(xAsF32, parameters)
  }

  toMatrix(x: InputType): DenseMatrixRs {
    // TODO: Handle case where x is DataFrame
    return (x as DenseMatrix).asRsMatrix('f32')
  }

  deserialize(data: Buffer): DBSCANF32I32MinkowskiF32 {
    return DBSCANF32I32MinkowskiF32.deserialize(data)
  }
}

export default DBSCANF32MinkowskiF32Provider
