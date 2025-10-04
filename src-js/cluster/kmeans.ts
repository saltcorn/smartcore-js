import { KMeansF64BigI64, KMeansF64I64, KMeansParameters, KMeansF64F64 } from '../../core-bindings/index.js'
import { DenseMatrix } from '../linalg/index.js'
import type { YType } from '../index.js'
import type { YTypeKey } from '../base_estimator.js'
import { BasePredictor } from '../base_predictor.js'
import { type DenseMatrixRs } from '../linalg/index.js'

interface IKMeansParameters {
  maxIter?: number
  k?: number
}

type KMeansRs = KMeansF64I64 | KMeansF64BigI64 | KMeansF64F64
type KMeansParametersRs = KMeansParameters

interface KMeansSerializedData {
  columns: string[] | null
  data: Buffer
  params: IKMeansParameters
  yType: YTypeKey
}

interface EstimatorClass {
  fit(matrix: DenseMatrixRs, params: KMeansParametersRs): KMeansRs
  deserialize(data: Buffer): KMeansRs
}

class KMeans extends BasePredictor<KMeansRs, KMeansParametersRs, YType> {
  public static readonly className = 'KMeans'
  public readonly name: string = KMeans.className
  public readonly config: IKMeansParameters
  private estimatorClasses: Record<YTypeKey, EstimatorClass | null>

  constructor(params?: IKMeansParameters) {
    const parameters = new KMeansParameters()
    let config = params || {}
    if (config.maxIter !== undefined) {
      parameters.withMaxIter(config.maxIter)
    }
    if (config.k !== undefined) {
      parameters.withK(config.k)
    }
    super(parameters)
    this.config = config

    this.estimatorClasses = {
      bigI64: KMeansF64BigI64,
      f64: KMeansF64F64,
      i64: KMeansF64I64,
      bigU64: null,
    }
  }

  protected fitEstimator(matrix: DenseMatrix, y: YType): KMeansRs {
    const EstimatorClass = this.estimatorClasses[this._yType!]
    if (EstimatorClass !== null) {
      return EstimatorClass.fit(matrix.asF64(), this.parameters)
    } else {
      throw new Error(`${this.name}: Unsupported data type for y '${y.constructor?.name || typeof y}'`)
    }
  }

  protected getComponentColumnName(index: number): string {
    return `KM${index + 1}`
  }

  predictMatrix(matrix: DenseMatrix): YType {
    return this.estimator!.predict(matrix.asF64())
  }

  serialize(): KMeansSerializedData {
    this.ensureFitted('serialize')

    return {
      columns: this.columns,
      data: this.estimator!.serialize(),
      params: this.config,
      yType: this._yType!,
    }
  }

  static deserialize(data: KMeansSerializedData): KMeans {
    let instance = new KMeans(data.params)
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

export { KMeans }
