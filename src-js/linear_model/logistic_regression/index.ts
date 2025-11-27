import { utilities, type InputType, type YType } from '../../index.js'
import { type RsPredictor } from '../../estimator.js'
import { DataFrame } from '../../data_frame.js'
import {
  type LogisticRegressionSolverName,
  LogisticRegression as LibLogisticRegression,
  type TypedArrayType,
  type DenseMatrixType,
  LogisticRegressionBuilder,
} from '../../core-bindings/index.js'

interface ILogisticRegressionBaseParameters {
  alpha?: number | bigint
  solver?: LogisticRegressionSolverName
}

interface ILogisticRegressionParameters extends ILogisticRegressionBaseParameters {
  fitDataXType?: DenseMatrixType
  fitDataYType?: TypedArrayType
  columns?: string[]
}

interface LogisticRegressionSerializedData {
  config: ILogisticRegressionParameters
  data: Buffer
}

interface HasColumns {
  columns: string[] | null
}

class LogisticRegression implements HasColumns {
  public static readonly className = 'LogisticRegression'
  public readonly name: string = LogisticRegression.className
  public readonly config: ILogisticRegressionParameters = {}

  private _isFitted: boolean = false
  private estimator: RsPredictor | null = null

  constructor(params?: ILogisticRegressionParameters) {
    this.config = params ?? {}
    this.config.fitDataXType = this.config.fitDataXType ?? ('F32' as DenseMatrixType)
    this.config.fitDataYType = this.config.fitDataYType ?? ('I32' as TypedArrayType)
  }

  get columns(): string[] | null {
    return this.config.columns ?? null
  }

  fit(x: InputType, y: YType): this {
    let matrix
    if (x instanceof DataFrame && this.columns !== null && this.columns.length !== 0)
      matrix = utilities.dataFrameToDenseMatrix(x, this.columns)
    else matrix = utilities.inputTypeToDenseMatrix(x)
    const yWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(y))
    const builder = new LogisticRegressionBuilder(matrix, yWrapped)
    if (this.config.alpha !== undefined) {
      builder.withAlpha(utilities.wrapNumber(this.config.alpha))
    }
    if (this.config.solver !== undefined) {
      builder.withSolver(this.config.solver)
    }
    this.estimator = builder.build()
    this._isFitted = true
    return this
  }

  protected getComponentColumnName(index: number): string {
    return `LogisticRegression${index + 1}`
  }

  protected ensureFitted(methodName: string): void {
    if (!this._isFitted || this.estimator === null) {
      throw new Error(`${this.name}: Cannot call '${methodName}' before calling 'fit'. Please fit the model first.`)
    }
  }

  predict(x: InputType): YType {
    this.ensureFitted('predict')
    if (x instanceof DataFrame) {
      const columns = Array.isArray(this.columns) ? this.columns : x.columnNames
      const matrix = utilities.dataFrameToDenseMatrix(x, columns)
      return this.estimator!.predict(matrix).field0
    }
    const matrixRs = utilities.inputTypeToDenseMatrix(x)
    return this.estimator!.predict(matrixRs).field0
  }

  serialize(): LogisticRegressionSerializedData {
    this.ensureFitted('serialize')

    return {
      data: this.estimator!.serialize(),
      config: this.config,
    }
  }

  private _deserialize(data: Buffer): this {
    if (this._isFitted) {
      throw new Error("Cannot call 'deserialize' on a fitted instance!")
    }
    this.estimator = LibLogisticRegression.deserialize(data)
    return this
  }

  static deserialize(data: LogisticRegressionSerializedData): LogisticRegression {
    let instance = new LogisticRegression(data.config)
    instance._deserialize(data.data)
    instance._isFitted = true
    return instance
  }
}

export { LogisticRegression, type ILogisticRegressionBaseParameters }
