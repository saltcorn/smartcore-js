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
  DBSCANF64HammingF64Parameters,
  DBSCANF64MahalanobisF64Parameters,
  DBSCANF64ManhattanF64Parameters,
  DBSCANF64MinkowskiF64Parameters,
  type KNNAlgorithmName,
} from '../core-bindings/index.js'
import type { YType } from '../index.js'
import { BasePredictor } from '../base_predictor.js'
import { type YTypeKey } from '../base_estimator.js'
import { DenseMatrix, type DenseMatrixRs } from '../linalg/index.js'

type DistanceRs = EuclidianF64 | HammingF64 | MahalanobisF64 | ManhattanF64 | MinkowskiF64
type DistanceKey = 'EuclidianF64' | 'HammingF64' | 'MahalanobisF64' | 'ManhattanF64' | 'MinkowskiF64'

interface IDBSCANParameters {
  minSamples?: number
  algorithm?: KNNAlgorithmName
  eps?: number
  distance?: DistanceRs
}

type DBSCANRs = DBSCANF64F64EuclidianF64
type DBSCANParametersRs =
  | DBSCANF64EuclidianF64Parameters
  | DBSCANF64HammingF64Parameters
  | DBSCANF64MahalanobisF64Parameters
  | DBSCANF64ManhattanF64Parameters
  | DBSCANF64MinkowskiF64Parameters

interface DBSCANSerializedData {
  columns: string[] | null
  data: Buffer
  params: IDBSCANParameters
  yType: YTypeKey
}

interface EstimatorClass {
  fit(matrix: DenseMatrixRs, params: DBSCANParametersRs): DBSCANRs
  deserialize(data: Buffer): DBSCANRs
}

class DBSCAN extends BasePredictor<DBSCANRs, DBSCANParametersRs, YType> {
  public static readonly className = 'DBSCAN'
  public readonly name: string = DBSCAN.className
  public readonly config: IDBSCANParameters

  private estimatorClasses: Record<DistanceKey, EstimatorClass>

  constructor(params?: IDBSCANParameters) {
    let parameters: DBSCANParametersRs = new DBSCANF64EuclidianF64Parameters()
    const config = params || {}
    if (config.minSamples !== undefined) {
      parameters.withMinSamples(config.minSamples)
    }
    if (config.algorithm !== undefined) {
      parameters.withAlgorithm(config.algorithm)
    }
    if (config.eps !== undefined) {
      parameters.withEps(config.eps)
    }
    if (config.distance && parameters instanceof DBSCANF64EuclidianF64Parameters) {
      if (config.distance instanceof HammingF64) {
        parameters = parameters.withDistanceHammingF64(config.distance)
      } else if (config.distance instanceof MahalanobisF64) {
        parameters = parameters.withDistanceMahalanobisF64(config.distance)
      } else if (config.distance instanceof ManhattanF64) {
        parameters = parameters.withDistanceManhattanF64(config.distance)
      } else if (config.distance instanceof MinkowskiF64) {
        parameters = parameters.withDistanceMinkowskiF64(config.distance)
      }
    }

    super(parameters)
    this.config = config

    this.estimatorClasses = {
      EuclidianF64: DBSCANF64F64EuclidianF64,
      HammingF64: DBSCANF64F64HammingF64,
      MahalanobisF64: DBSCANF64F64MahalanobisF64,
      ManhattanF64: DBSCANF64F64ManhattanF64,
      MinkowskiF64: DBSCANF64F64MinkowskiF64,
    }
  }

  get distanceKey(): DistanceKey {
    return DBSCAN.getDistanceKey(this.config.distance)
  }

  static getDistanceKey(distance: any): DistanceKey {
    if (distance instanceof EuclidianF64 || distance === undefined) return 'EuclidianF64'
    if (distance instanceof HammingF64) return 'HammingF64'
    if (distance instanceof MahalanobisF64) return 'MahalanobisF64'
    if (distance instanceof ManhattanF64) return 'ManhattanF64'
    if (distance instanceof MinkowskiF64) return 'MinkowskiF64'
    throw new Error(`${this.name}: Unexpected value of distance '${typeof distance}'`)
  }

  protected fitEstimator(matrix: DenseMatrix, _y: YType): DBSCANRs {
    const EstimatorClass = this.estimatorClasses[this.distanceKey!]
    return EstimatorClass.fit(matrix.asF64(), this.parameters)
  }

  protected getComponentColumnName(index: number): string {
    return `DBSCAN${index + 1}`
  }

  predictMatrix(matrix: DenseMatrix): YType {
    return this.estimator!.predict(matrix.asF64())
  }

  serialize(): DBSCANSerializedData {
    this.ensureFitted('serialize')

    return {
      columns: this.columns,
      data: this.estimator!.serialize(),
      params: this.config,
      yType: this._yType!,
    }
  }

  static deserialize(data: DBSCANSerializedData): DBSCAN {
    let instance = new DBSCAN(data.params)
    let distanceKey = DBSCAN.getDistanceKey(data.params.distance)
    const EstimatorClass = instance.estimatorClasses[distanceKey]
    if (EstimatorClass === null) {
      throw new Error(`${this.name}: Unexpected yType value '${data.yType}'`)
    }
    instance.estimator = EstimatorClass.deserialize(data.data)
    instance._isFitted = true
    instance._yType = data.yType
    return instance
  }
}

export { DBSCAN }
