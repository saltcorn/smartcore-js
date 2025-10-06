import { CategoricalNBBigU64, CategoricalNBParameters } from '../core-bindings/index.js'
import { DenseMatrix, type DenseMatrixRs } from '../linalg/index.js'
import type { YType } from '../index.js'
import { BasePredictor } from '../base_predictor.js'
import { type YTypeKey } from '../base_estimator.js'

type CategoricalNBRs = CategoricalNBBigU64
type CategoricalNBParametersRs = CategoricalNBParameters

interface ICategoricalNBParameters {
  alpha?: number
}

interface CategoricalNBSerializedData {
  columns: string[] | null
  data: Buffer
  params: ICategoricalNBParameters
  yType: YTypeKey
}

interface EstimatorClass {
  fit(matrix: DenseMatrixRs, y: YType, params: CategoricalNBParametersRs): CategoricalNBRs
  deserialize(data: Buffer): CategoricalNBRs
}

class CategoricalNB extends BasePredictor<CategoricalNBRs, CategoricalNBParametersRs, YType> {
  public static readonly className = 'CategoricalNB'
  public readonly name: string = CategoricalNB.className
  public readonly config: ICategoricalNBParameters

  private estimatorClasses: Record<YTypeKey, EstimatorClass | null>

  constructor(params?: ICategoricalNBParameters) {
    const parameters = new CategoricalNBParameters()
    const config = params || {}
    if (config.alpha) {
      parameters.withAlpha(config.alpha)
    }
    super(parameters)
    this.config = config
    this.estimatorClasses = {
      bigU64: CategoricalNBBigU64,
      bigI64: null,
      i64: null,
      f64: null,
    }
  }

  protected fitEstimator(matrix: DenseMatrix, y: YType): CategoricalNBRs {
    const EstimatorClass = this.estimatorClasses[this._yType!]
    if (EstimatorClass !== null) {
      return EstimatorClass.fit(matrix.asF64(), y, this.parameters)
    } else {
      throw new Error(`${this.name}: Unsupported data type for y '${y.constructor?.name || typeof y}'`)
    }
  }

  protected getComponentColumnName(index: number): string {
    return `CNB${index + 1}`
  }

  predictMatrix(matrix: DenseMatrix): YType {
    return this.estimator!.predict(matrix.asU64())
  }

  serialize(): CategoricalNBSerializedData {
    this.ensureFitted('serialize')

    return {
      columns: this.columns,
      data: this.estimator!.serialize(),
      params: this.config,
      yType: this._yType!,
    }
  }

  static deserialize(data: CategoricalNBSerializedData): CategoricalNB {
    let instance = new CategoricalNB(data.params)
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

export default CategoricalNB
