import {
  LogisticRegressionF64I64,
  LogisticRegressionParametersF64,
  LogisticRegressionF64BigI64,
  LogisticRegressionF64BigU64,
} from '../../core-bindings/index.js'
import { DenseMatrix, type DenseMatrixRs } from '../linalg/index.js'
import type { LogisticRegressionSolverName } from '../../core-bindings/index.js'
import type { YType } from '../index.js'
import { BasePredictor } from '../base_predictor.js'
import { type YTypeKey } from '../base_estimator.js'

type LogisticRegressionRs = LogisticRegressionF64I64 | LogisticRegressionF64BigI64 | LogisticRegressionF64BigU64

type LogisticRegressionParametersRs = LogisticRegressionParametersF64

interface ILogicRegressionParameters {
  alpha?: number
  solver?: LogisticRegressionSolverName.LBFGS
}

interface LogisticRegressionSerializedData {
  columns: string[] | null
  data: Buffer
  params: ILogicRegressionParameters
  yType: YTypeKey
}

interface EstimatorClass {
  fit(matrix: DenseMatrixRs, y: YType, params: LogisticRegressionParametersRs): LogisticRegressionRs
  deserialize(data: Buffer): LogisticRegressionRs
}

class LogisticRegression extends BasePredictor<LogisticRegressionRs, LogisticRegressionParametersRs, YType> {
  public static readonly className = 'LogisticRegression'
  public readonly name: string = LogisticRegression.className
  public readonly config: ILogicRegressionParameters

  private estimatorClasses: Record<YTypeKey, EstimatorClass | null>

  constructor(params?: ILogicRegressionParameters) {
    const parameters = new LogisticRegressionParametersF64()
    const config = params || {}
    if (config.alpha !== undefined) {
      parameters.withAlpha(config.alpha)
    }
    if (config.solver !== undefined) {
      parameters.withSolver(config.solver)
    }
    super(parameters)
    this.config = config
    this.estimatorClasses = {
      bigI64: LogisticRegressionF64BigI64,
      bigU64: LogisticRegressionF64BigU64,
      i64: LogisticRegressionF64I64,
      f64: null,
    }
  }

  protected fitEstimator(matrix: DenseMatrix, y: YType): LogisticRegressionRs {
    const EstimatorClass = this.estimatorClasses[this._yType!]
    if (EstimatorClass !== null) {
      return EstimatorClass.fit(matrix.asF64(), y, this.parameters)
    } else {
      throw new Error(`${this.name}: Unsupported data type for y '${y.constructor?.name || typeof y}'`)
    }
  }

  protected getComponentColumnName(index: number): string {
    return `LR${index + 1}`
  }

  predictMatrix(matrix: DenseMatrix): YType {
    return this.estimator!.predict(matrix.asF64())
  }

  serialize(): LogisticRegressionSerializedData {
    this.ensureFitted('serialize')

    return {
      columns: this.columns,
      data: this.estimator!.serialize(),
      params: this.config,
      yType: this._yType!,
    }
  }

  static deserialize(data: LogisticRegressionSerializedData): LogisticRegression {
    let instance = new LogisticRegression(data.params)
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

export default LogisticRegression
