import { GaussianNBF64BigU64, GaussianNBParameters } from '../../core-bindings/index.js'
import { DenseMatrix, type DenseMatrixRs } from '../linalg/index.js'
import type { YType } from '../index.js'
import { BasePredictor } from '../base_predictor.js'
import { type YTypeKey } from '../base_estimator.js'

type GaussianNBRs = GaussianNBF64BigU64
type GaussianNBParametersRs = GaussianNBParameters

interface IGaussianNBParameters {
  priors?: Float64Array
}

interface GaussianNBSerializedData {
  columns: string[] | null
  data: Buffer
  params: IGaussianNBParameters
  yType: YTypeKey
}

interface EstimatorClass {
  fit(matrix: DenseMatrixRs, y: YType, params: GaussianNBParametersRs): GaussianNBRs
  deserialize(data: Buffer): GaussianNBRs
}

class GaussianNB extends BasePredictor<GaussianNBRs, GaussianNBParametersRs, YType> {
  public static readonly className = 'GaussianNB'
  public readonly name: string = GaussianNB.className
  public readonly config: IGaussianNBParameters

  private estimatorClasses: Record<YTypeKey, EstimatorClass | null>

  constructor(params?: IGaussianNBParameters) {
    const parameters = new GaussianNBParameters()
    const config = params || {}

    if (config.priors) {
      parameters.withPriors(config.priors)
    }

    super(parameters)
    this.config = config
    this.estimatorClasses = {
      bigU64: GaussianNBF64BigU64,
      bigI64: null,
      i64: null,
      f64: null,
    }
  }

  protected fitEstimator(matrix: DenseMatrix, y: YType): GaussianNBRs {
    const EstimatorClass = this.estimatorClasses[this._yType!]
    if (EstimatorClass !== null) {
      return EstimatorClass.fit(matrix.asF64(), y, this.parameters)
    } else {
      throw new Error(`${this.name}: Unsupported data type for y '${y.constructor?.name || typeof y}'`)
    }
  }

  protected getComponentColumnName(index: number): string {
    return `GNB${index + 1}`
  }

  predictMatrix(matrix: DenseMatrix): YType {
    return this.estimator!.predict(matrix.asF64())
  }

  serialize(): GaussianNBSerializedData {
    this.ensureFitted('serialize')

    return {
      columns: this.columns,
      data: this.estimator!.serialize(),
      params: this.config,
      yType: this._yType!,
    }
  }

  static deserialize(data: GaussianNBSerializedData): GaussianNB {
    let instance = new GaussianNB(data.params)
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

export default GaussianNB
