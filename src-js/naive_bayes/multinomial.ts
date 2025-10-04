import { MultinomialNBU64BigU64, MultinomialNBParameters } from '../../core-bindings/index.js'
import { DenseMatrix, type DenseMatrixRs } from '../linalg/index.js'
import type { YType } from '../index.js'
import { BasePredictor } from '../base_predictor.js'
import { type YTypeKey } from '../base_estimator.js'

type MultinomialNBRs = MultinomialNBU64BigU64
type MultinomialNBParametersRs = MultinomialNBParameters

interface IMultinomialNBParameters {
  priors?: Float64Array
  alpha?: number
}

interface MultinomialNBSerializedData {
  columns: string[] | null
  data: Buffer
  params: IMultinomialNBParameters
  yType: YTypeKey
}

interface EstimatorClass {
  fit(matrix: DenseMatrixRs, y: YType, params: MultinomialNBParametersRs): MultinomialNBRs
  deserialize(data: Buffer): MultinomialNBRs
}

class MultinomialNB extends BasePredictor<MultinomialNBRs, MultinomialNBParametersRs, YType> {
  public static readonly className = 'MultinomialNB'
  public readonly name: string = MultinomialNB.className
  public readonly config: IMultinomialNBParameters

  private estimatorClasses: Record<YTypeKey, EstimatorClass | null>

  constructor(params?: IMultinomialNBParameters) {
    const parameters = new MultinomialNBParameters()
    const config = params || {}
    if (config.priors) {
      parameters.withPriors(config.priors)
    }
    if (config.alpha) {
      parameters.withAlpha(config.alpha)
    }
    super(parameters)
    this.config = config
    this.estimatorClasses = {
      bigU64: MultinomialNBU64BigU64,
      bigI64: null,
      i64: null,
      f64: null,
    }
  }

  protected fitEstimator(matrix: DenseMatrix, y: YType): MultinomialNBRs {
    const EstimatorClass = this.estimatorClasses[this._yType!]
    if (EstimatorClass !== null) {
      return EstimatorClass.fit(matrix.asF64(), y, this.parameters)
    } else {
      throw new Error(`${this.name}: Unsupported data type for y '${y.constructor?.name || typeof y}'`)
    }
  }

  protected getComponentColumnName(index: number): string {
    return `MNB${index + 1}`
  }

  predictMatrix(matrix: DenseMatrix): YType {
    return this.estimator!.predict(matrix.asU64())
  }

  serialize(): MultinomialNBSerializedData {
    this.ensureFitted('serialize')

    return {
      columns: this.columns,
      data: this.estimator!.serialize(),
      params: this.config,
      yType: this._yType!,
    }
  }

  static deserialize(data: MultinomialNBSerializedData): MultinomialNB {
    let instance = new MultinomialNB(data.params)
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

export default MultinomialNB
