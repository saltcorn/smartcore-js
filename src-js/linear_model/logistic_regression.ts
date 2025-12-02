import { utilities, type InputType, type YType } from '../index.js'
import { type RsPredictor } from '../estimator.js'
import { DataFrame } from '../data_frame.js'
import {
  type LogisticRegressionSolverName,
  LogisticRegression as LibLogisticRegression,
  type TypedArrayType,
  type DenseMatrixType,
  LogisticRegressionBuilder,
} from '../core-bindings/index.js'

interface ILogisticRegressionBaseParameters {
  alpha?: number | bigint
  solver?: LogisticRegressionSolverName
}

interface ILogisticRegressionParameters extends ILogisticRegressionBaseParameters {
  fitDataXType?: DenseMatrixType
  fitDataYType?: TypedArrayType
  columns?: string[]
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
    let matrix = utilities.inputTypeToDenseMatrix(x, {
      columns: this.config.columns,
      numberType: this.config.fitDataXType,
    })
    const yWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(y, { numberType: this.config.fitDataYType }))
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
      const matrix = utilities.dataFrameToDenseMatrix(x, { columns, numberType: this.config.fitDataXType })
      return this.estimator!.predict(matrix).field0
    }
    const matrixRs = utilities.inputTypeToDenseMatrix(x, {
      columns: this.config.columns,
      numberType: this.config.fitDataXType,
    })
    return this.estimator!.predict(matrixRs).field0
  }

  serialize(): Buffer {
    this.ensureFitted('serialize')
    return this.estimator!.serialize()
  }

  static deserialize(data: Buffer): LogisticRegression {
    let instance = new LogisticRegression()
    instance.estimator = LibLogisticRegression.deserialize(data)
    instance._isFitted = true
    return instance
  }
}

export { LogisticRegression, type ILogisticRegressionBaseParameters }
