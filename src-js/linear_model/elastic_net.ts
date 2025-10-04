import {
  ElasticNetF64I64,
  ElasticNetParameters,
  ElasticNetF64F64,
  ElasticNetF64BigI64,
  ElasticNetF64BigU64,
} from '../../core-bindings/index.js'
import { DenseMatrix, type DenseMatrixRs } from '../linalg/index.js'
import type { YType } from '../index.js'
import { BasePredictor } from '../base_predictor.js'
import { type YTypeKey } from '../base_estimator.js'

type ElasticNetRs = ElasticNetF64I64 | ElasticNetF64F64 | ElasticNetF64BigI64 | ElasticNetF64BigU64
type ElasticNetParametersRs = ElasticNetParameters

interface IElasticNetParameters {
  alpha?: number
  normalize?: boolean
  tol?: number
  maxIter?: number
  l1Ratio?: number
}

interface ElasticNetSerializedData {
  columns: string[] | null
  data: Buffer
  params: IElasticNetParameters
  yType: YTypeKey
}

interface EstimatorClass {
  fit(matrix: DenseMatrixRs, y: YType, params: ElasticNetParametersRs): ElasticNetRs
  deserialize(data: Buffer): ElasticNetRs
}

class ElasticNet extends BasePredictor<ElasticNetRs, ElasticNetParametersRs, YType> {
  public static readonly className = 'ElasticNet'
  public readonly name: string = ElasticNet.className
  public readonly config: IElasticNetParameters

  private estimatorClasses: Record<YTypeKey, EstimatorClass | null>

  constructor(params?: IElasticNetParameters) {
    const parameters = new ElasticNetParameters()
    const config = params || {}
    if (config?.alpha) {
      parameters.withAlpha(config.alpha)
    }
    if (config?.normalize) {
      parameters.withNormalize(config.normalize)
    }
    if (config?.tol) {
      parameters.withTol(config.tol)
    }
    if (config?.maxIter) {
      parameters.withMaxIter(config.maxIter)
    }
    if (config?.l1Ratio) {
      parameters.withL1Ratio(config.l1Ratio)
    }
    super(parameters)
    this.config = config
    this.estimatorClasses = {
      bigI64: ElasticNetF64BigI64,
      bigU64: ElasticNetF64BigU64,
      i64: ElasticNetF64I64,
      f64: ElasticNetF64F64,
    }
  }

  protected fitEstimator(matrix: DenseMatrix, y: YType): ElasticNetRs {
    const EstimatorClass = this.estimatorClasses[this._yType!]
    if (EstimatorClass !== null) {
      return EstimatorClass.fit(matrix.asF64(), y, this.parameters)
    } else {
      throw new Error(`${this.name}: Unsupported data type for y '${y.constructor?.name || typeof y}'`)
    }
  }

  protected getComponentColumnName(index: number): string {
    return `EN${index + 1}`
  }

  predictMatrix(matrix: DenseMatrix): YType {
    return this.estimator!.predict(matrix.asF64())
  }

  serialize(): ElasticNetSerializedData {
    this.ensureFitted('serialize')

    return {
      columns: this.columns,
      data: this.estimator!.serialize(),
      params: this.config,
      yType: this._yType!,
    }
  }

  static deserialize(data: ElasticNetSerializedData): ElasticNet {
    let instance = new ElasticNet(data.params)
    const EstimatorClass = instance.estimatorClasses[data.yType]
    if (EstimatorClass === null) {
      throw new Error(`${this.name}: Unexpected yType value '${data.yType}'`)
    }
    instance.estimator = EstimatorClass.deserialize(data.data)
    instance._isFitted = true
    instance._yType = data.yType
    return instance
  }
}

export default ElasticNet
