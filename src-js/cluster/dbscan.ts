import {
  DBSCANF64EuclidianF64Parameters,
  DBSCANF64F64EuclidianF64,
  DBSCANF64F64HammingF64,
  DBSCANF64F64MahalanobisF64,
  DBSCANF64F64ManhattanF64,
  DBSCANF64F64MinkowskiF64,
  EuclidianF64,
  HammingF64,
  MahalanobisF64,
  ManhattanF64,
  MinkowskiF64,
} from '../../core-bindings/index.js'
import {
  DBSCANF64HammingF64Parameters,
  DBSCANF64MahalanobisF64Parameters,
  DBSCANF64ManhattanF64Parameters,
  DBSCANF64MinkowskiF64Parameters,
  type KNNAlgorithmName,
} from '../../core-bindings/index.js'
import { DataFrame } from '../data_frame.js'
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

interface ISerializedData {
  columns: string[] | null
  data: Buffer
}

type DBSCANRs = DBSCANF64F64EuclidianF64
type DBSCANParametersRs =
  | DBSCANF64EuclidianF64Parameters
  | DBSCANF64HammingF64Parameters
  | DBSCANF64MahalanobisF64Parameters
  | DBSCANF64ManhattanF64Parameters
  | DBSCANF64MinkowskiF64Parameters

class DBSCAN implements Estimator<XType, YType, DBSCAN>, Predictor<XType, YType> {
  private parameters: DBSCANParametersRs
  private estimator: DBSCANRs | null = null
  public static readonly className = 'DBSCAN'
  public readonly name: string = DBSCAN.className
  private columns: string[] | null = null

  constructor(params?: DBSCANParams) {
    this.parameters = new DBSCANF64EuclidianF64Parameters()
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
      if (params.distance && this.parameters instanceof DBSCANF64EuclidianF64Parameters) {
        if (params.distance instanceof HammingF64) {
          this.parameters = this.parameters.withDistanceHammingF64(params.distance)
        } else if (params.distance instanceof MahalanobisF64) {
          this.parameters = this.parameters.withDistanceMahalanobisF64(params.distance)
        } else if (params.distance instanceof ManhattanF64) {
          this.parameters = this.parameters.withDistanceManhattanF64(params.distance)
        } else if (params.distance instanceof MinkowskiF64) {
          this.parameters = this.parameters.withDistanceMinkowskiF64(params.distance)
        }
      }
    }
  }

  fit(x: XType, y: YType): DBSCAN {
    let matrix: DenseMatrix
    if (x instanceof DenseMatrix) {
      matrix = x
    } else if (x instanceof DataFrame) {
      this.columns = x.columnNames
      matrix = DenseMatrix.f64(x.getColumns())
    } else {
      matrix = DenseMatrix.f64(x)
    }

    if (!y || y.length === 0) {
      throw new Error('Input arrays cannot be empty.')
    }

    if (y instanceof Float64Array) {
      if (this.parameters instanceof DBSCANF64EuclidianF64Parameters) {
        this.estimator = DBSCANF64F64EuclidianF64.fit(matrix.asF64(), this.parameters)
      } else if (this.parameters instanceof DBSCANF64HammingF64Parameters) {
        this.estimator = DBSCANF64F64HammingF64.fit(matrix.asF64(), this.parameters)
      } else if (this.parameters instanceof DBSCANF64MahalanobisF64Parameters) {
        this.estimator = DBSCANF64F64MahalanobisF64.fit(matrix.asF64(), this.parameters)
      } else if (this.parameters instanceof DBSCANF64ManhattanF64Parameters) {
        this.estimator = DBSCANF64F64ManhattanF64.fit(matrix.asF64(), this.parameters)
      } else if (this.parameters instanceof DBSCANF64MinkowskiF64Parameters) {
        this.estimator = DBSCANF64F64MinkowskiF64.fit(matrix.asF64(), this.parameters)
      }
    } else {
      throw new Error('Unsupported data type for input arrays.')
    }

    return this
  }

  predict(x: XType): YType {
    if (this.estimator === null) {
      throw new Error("The 'fit' method should called before the 'predict' method is called.")
    }

    let matrix: DenseMatrix
    if (x instanceof DenseMatrix) {
      matrix = x
    } else if (x instanceof DataFrame) {
      if (this.columns === null) {
        matrix = DenseMatrix.f64(x.getColumns())
      } else {
        matrix = DenseMatrix.f64(x.selectColumnsByName(this.columns).getColumns())
      }
    } else {
      matrix = DenseMatrix.f64(x)
    }

    return this.estimator.predict(matrix.asF64())
  }

  serialize() {
    return this.estimator?.serialize()
  }

  static deserialize(serializedData: ISerializedData): DBSCAN {
    let estimator = DBSCANF64F64EuclidianF64.deserialize(serializedData.data)
    let instance = new DBSCAN()
    instance.columns = serializedData.columns
    instance.estimator = estimator
    return instance
  }
}

export { DBSCAN }
