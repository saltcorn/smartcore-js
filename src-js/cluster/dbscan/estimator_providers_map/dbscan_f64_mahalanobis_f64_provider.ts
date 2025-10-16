import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js'
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js'
import {
  DBSCANF64I32MahalanobisF64,
  DBSCANF64EuclidianF64Parameters,
  DBSCANF64MahalanobisF64Parameters,
  MahalanobisF64,
  DenseMatrixF64,
} from '../../../core-bindings/index.js'
import { type IDBSCANBaseParameters, setDBSCANParametersValues } from '../parameters.js'
import { type PredictorProvider } from '../../../estimator.js'

class DBSCANF64MahalanobisF64Provider
  implements PredictorProvider<IDBSCANBaseParameters, DBSCANF64MahalanobisF64Parameters, DBSCANF64I32MahalanobisF64>
{
  parameters(config: IDBSCANBaseParameters): DBSCANF64MahalanobisF64Parameters {
    if (!config.data) {
      throw new Error(`MahalanobisF64 expects 'config.data' to be provided.`)
    }
    const dataAsF64 = (config.data as DenseMatrix).asRsMatrix('f64') as DenseMatrixF64
    const parameters = new DBSCANF64EuclidianF64Parameters().withDistanceMahalanobisF64(new MahalanobisF64(dataAsF64))
    setDBSCANParametersValues(parameters, config)
    return parameters
  }

  estimator(x: InputType, _y: YType, parameters: DBSCANF64MahalanobisF64Parameters): DBSCANF64I32MahalanobisF64 {
    // TODO: Handle case where x is DataFrame
    const xAsF64 = (x as DenseMatrix).asRsMatrix('f64') as DenseMatrixF64
    return DBSCANF64I32MahalanobisF64.fit(xAsF64, parameters)
  }

  toMatrix(x: InputType): DenseMatrixRs {
    // TODO: Handle case where x is DataFrame
    return (x as DenseMatrix).asRsMatrix('f64')
  }

  deserialize(data: Buffer): DBSCANF64I32MahalanobisF64 {
    return DBSCANF64I32MahalanobisF64.deserialize(data)
  }
}

export default DBSCANF64MahalanobisF64Provider
