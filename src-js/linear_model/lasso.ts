import { LassoF64I64, LassoParameters, LassoF64F64, LassoF64BigI64, LassoF64BigU64 } from '../core-bindings/index.js'
import { DenseMatrix, type DenseMatrixRs } from '../linalg/index.js'
import type { YType } from '../index.js'
import { BasePredictor } from '../base_predictor.js'
import { type YTypeKey } from '../base_estimator.js'

type LassoRs = LassoF64I64 | LassoF64F64 | LassoF64BigI64 | LassoF64BigU64
type LassoParametersRs = LassoParameters

interface ILassoParameters {
  alpha?: number
  normalize?: boolean
  tol?: number
  maxIter?: number
}

interface LassoSerializedData {
  columns: string[] | null
  data: Buffer
  params: ILassoParameters
  yType: YTypeKey
}

interface EstimatorClass {
  fit(matrix: DenseMatrixRs, y: YType, params: LassoParametersRs): LassoRs
  deserialize(data: Buffer): LassoRs
}

class Lasso extends BasePredictor<LassoRs, LassoParametersRs, YType> {
  public static readonly className = 'Lasso'
  public readonly name: string = Lasso.className
  public readonly config: ILassoParameters

  private estimatorClasses: Record<YTypeKey, EstimatorClass | null>

  constructor(params?: ILassoParameters) {
    const parameters = new LassoParameters()
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
    super(parameters)
    this.config = config
    this.estimatorClasses = {
      bigI64: LassoF64BigI64,
      bigU64: LassoF64BigU64,
      i64: LassoF64I64,
      f64: LassoF64F64,
    }
  }

  protected fitEstimator(matrix: DenseMatrix, y: YType): LassoRs {
    const EstimatorClass = this.estimatorClasses[this._yType!]
    if (EstimatorClass !== null) {
      return EstimatorClass.fit(matrix.asF64(), y, this.parameters)
    } else {
      throw new Error(`${this.name}: Unsupported data type for y '${y.constructor?.name || typeof y}'`)
    }
  }

  protected getComponentColumnName(index: number): string {
    return `LASSO${index + 1}`
  }

  predictMatrix(matrix: DenseMatrix): YType {
    return this.estimator!.predict(matrix.asF64())
  }

  serialize(): LassoSerializedData {
    this.ensureFitted('serialize')

    return {
      columns: this.columns,
      data: this.estimator!.serialize(),
      params: this.config,
      yType: this._yType!,
    }
  }

  static deserialize(data: LassoSerializedData): Lasso {
    let instance = new Lasso(data.params)
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

export default Lasso
