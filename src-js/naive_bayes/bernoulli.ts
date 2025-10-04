import { BernoulliNBF64BigU64, BernoulliNBF64Parameters } from '../../core-bindings/index.js'
import { DenseMatrix, type DenseMatrixRs } from '../linalg/index.js'
import type { YType } from '../index.js'
import { BasePredictor } from '../base_predictor.js'
import { type YTypeKey } from '../base_estimator.js'

type BernoulliNBRs = BernoulliNBF64BigU64
type BernoulliNBParametersRs = BernoulliNBF64Parameters

interface IBernoulliNBParameters {
  priors?: Float64Array
  alpha?: number
  binarize?: number
}

interface BernoulliNBSerializedData {
  columns: string[] | null
  data: Buffer
  params: IBernoulliNBParameters
  yType: YTypeKey
}

interface EstimatorClass {
  fit(matrix: DenseMatrixRs, y: YType, params: BernoulliNBParametersRs): BernoulliNBRs
  deserialize(data: Buffer): BernoulliNBRs
}

class BernoulliNB extends BasePredictor<BernoulliNBRs, BernoulliNBParametersRs, YType> {
  public static readonly className = 'BernoulliNB'
  public readonly name: string = BernoulliNB.className
  public readonly config: IBernoulliNBParameters

  private estimatorClasses: Record<YTypeKey, EstimatorClass | null>

  constructor(params?: IBernoulliNBParameters) {
    const parameters = new BernoulliNBF64Parameters()
    const config = params || {}
    if (config?.alpha) {
      parameters.withAlpha(config.alpha)
    }
    if (config?.priors) {
      parameters.withPriors(config.priors)
    }
    if (config?.binarize) {
      parameters.withBinarize(config.binarize)
    }
    super(parameters)
    this.config = config
    this.estimatorClasses = {
      bigU64: BernoulliNBF64BigU64,
      bigI64: null,
      i64: null,
      f64: null,
    }
  }

  protected fitEstimator(matrix: DenseMatrix, y: YType): BernoulliNBRs {
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

  serialize(): BernoulliNBSerializedData {
    this.ensureFitted('serialize')

    return {
      columns: this.columns,
      data: this.estimator!.serialize(),
      params: this.config,
      yType: this._yType!,
    }
  }

  static deserialize(data: BernoulliNBSerializedData): BernoulliNB {
    let instance = new BernoulliNB(data.params)
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

export default BernoulliNB
