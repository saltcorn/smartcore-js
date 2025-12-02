import { type DenseMatrixRs, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DBSCANF32I32MahalanobisF32,
  DBSCANF32EuclidianF32Parameters,
  DBSCANF32MahalanobisF32Parameters,
  MahalanobisF32,
  DenseMatrixF32,
} from '../../../core-bindings/index.js'
import { type IDBSCANBaseParameters, setDBSCANParametersValues } from '../parameters.js'
import { type PredictorProvider } from '../../../estimator.js'

class DBSCANF32MahalanobisF32Provider
  implements PredictorProvider<IDBSCANBaseParameters, DBSCANF32MahalanobisF32Parameters, DBSCANF32I32MahalanobisF32>
{
  parameters(config: IDBSCANBaseParameters): DBSCANF32MahalanobisF32Parameters {
    if (!config.data) {
      throw new Error(`MahalanobisF32 expects 'config.data' to be provided.`)
    }
    const dataAsF32 = (config.data as DenseMatrix).asRsMatrix('f32') as DenseMatrixF32
    const parameters = new DBSCANF32EuclidianF32Parameters().withDistanceMahalanobisF32(new MahalanobisF32(dataAsF32))
    setDBSCANParametersValues(parameters, config)
    return parameters
  }

  estimator(x: DenseMatrix, _y: YType, parameters: DBSCANF32MahalanobisF32Parameters): DBSCANF32I32MahalanobisF32 {
    const xAsF32 = x.asRsMatrix('f32') as DenseMatrixF32
    return DBSCANF32I32MahalanobisF32.fit(xAsF32, parameters)
  }

  toMatrix(x: DenseMatrix): DenseMatrixRs {
    return x.asRsMatrix('f32')
  }

  deserialize(data: Buffer): DBSCANF32I32MahalanobisF32 {
    return DBSCANF32I32MahalanobisF32.deserialize(data)
  }
}

export default DBSCANF32MahalanobisF32Provider
