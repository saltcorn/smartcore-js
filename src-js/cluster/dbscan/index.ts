import type { YType } from '../../index.js'
import { BasePredictor } from '../../base_predictor.js'
import { type YTypeKey } from '../../base_estimator.js'
import { DenseMatrix } from '../../linalg/index.js'
import {
  estimatorClasses,
  getParametersInstance,
  type DistanceKey,
  type EstimatorClass,
  type DBSCANParametersRs,
  type DBSCANRs,
  type IDBSCANParameters,
} from './parameters.js'

interface DBSCANSerializedData {
  columns: string[] | null
  data: Buffer
  params: IDBSCANParameters
  yType: YTypeKey
}

class DBSCAN extends BasePredictor<DBSCANRs, DBSCANParametersRs, YType> {
  public static readonly className = 'DBSCAN'
  public readonly name: string = DBSCAN.className
  public readonly config: IDBSCANParameters

  private estimatorClasses: Record<DistanceKey, EstimatorClass>

  constructor(params?: IDBSCANParameters) {
    const config = params || {}
    super(getParametersInstance(config))
    this.config = config

    this.estimatorClasses = estimatorClasses
  }

  static defaultDistanceKey(): DistanceKey {
    return 'EuclidianF32'
  }

  get distanceKey(): DistanceKey {
    return this.config.distance || DBSCAN.defaultDistanceKey()
  }

  protected fitEstimator(matrix: DenseMatrix, _y: YType): DBSCANRs {
    const EstimatorClass = this.estimatorClasses[this.distanceKey!]
    return EstimatorClass.fit(matrix.asRsMatrix(), this.parameters)
  }

  protected getComponentColumnName(index: number): string {
    return `DBSCAN${index + 1}`
  }

  predictMatrix(matrix: DenseMatrix): YType {
    return this.estimator!.predict(matrix.asRsMatrix())
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
    const EstimatorClass = instance.estimatorClasses[data.params.distance || DBSCAN.defaultDistanceKey()]
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
