import {
  EuclidianF64DBSCANF64Parameters,
  DBSCANF64F64,
  EuclidianF64,
  HammingF64,
  MahalanobisF64,
  ManhattanF64,
  MinkowskiF64,
} from '../../core-bindings/index.js'
import type { KNNAlgorithmName } from '../../core-bindings/index.js'
import type { XType, YType } from '../index.js'
import { DenseMatrix } from '../linalg/index.js'
import type { Estimator, Predictor } from '../pipeline/index.js'

type DistanceRs = EuclidianF64 | HammingF64 | MahalanobisF64 | ManhattanF64 | MinkowskiF64

interface DBSCANParams {
  minSamples?: number
  algorithm?: KNNAlgorithmName
  eps?: number
  distance?: DistanceRs
}

type DBSCANRs = DBSCANF64F64
type DBSCANParametersRs = EuclidianF64DBSCANF64Parameters

class DBSCAN implements Estimator<XType, YType, DBSCAN>, Predictor<XType, YType> {
  private parameters: DBSCANParametersRs
  private estimator: DBSCANRs | null = null

  constructor(params?: DBSCANParams) {
    this.parameters = new EuclidianF64DBSCANF64Parameters()
    if (params) {
      if (params.minSamples !== undefined) {
        this.parameters.withMinSamples(params.minSamples)
      }
      if (params.algorithm !== undefined) {
        this.parameters.withAlgorithm(params.algorithm)
      }
      if (params.eps !== undefined) {
        this.parameters.withEps(params.eps)
      }
      if (params.distance) {
        if (params.distance instanceof HammingF64) {
          this.parameters.withDistanceHammingF64(params.distance)
        } else if (params.distance instanceof MahalanobisF64) {
          this.parameters.withDistanceMahalanobisF64(params.distance)
        } else if (params.distance instanceof ManhattanF64) {
          this.parameters.withDistanceManhattanF64(params.distance)
        } else if (params.distance instanceof MinkowskiF64) {
          this.parameters.withDistanceMinkowskiF64(params.distance)
        }
      }
    }
  }

  fit(x: XType, y: YType): DBSCAN {
    let matrix = x instanceof DenseMatrix ? x : DenseMatrix.f64(x)

    if (!y || y.length === 0) {
      throw new Error('Input arrays cannot be empty.')
    }

    if (y instanceof Float64Array) {
      this.estimator = DBSCANF64F64.fit(matrix.asF64(), this.parameters)
    } else {
      throw new Error('Unsupported data type for input arrays.')
    }

    return this
  }

  predict(x: XType): YType {
    if (this.estimator === null) {
      throw new Error("The 'fit' method should called before the 'predict' method is called.")
    }

    let matrix = x instanceof DenseMatrix ? x : DenseMatrix.f64(x)
    return this.estimator.predict(matrix.asF64())
  }

  serialize() {
    return this.estimator?.serialize()
  }

  static deserialize(data: Buffer): DBSCAN {
    let estimator = DBSCANF64F64.deserialize(data)
    let instance = new DBSCAN()
    instance.estimator = estimator
    return instance
  }
}

export { DBSCAN }
