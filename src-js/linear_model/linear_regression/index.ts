import { utilities, type InputType, type YType } from '../../index.js'
import { type RsPredictor } from '../../estimator.js'
import { DataFrame } from '../../data_frame.js'
import {
  LinearRegression as LibLinearRegression,
  type DenseMatrixType,
  LinearRegressionBuilder,
  type LinearRegressionSolverName,
  type TypedArrayType,
} from '../../core-bindings/index.js'

interface ILinearRegressionBaseParameters {
  solver?: LinearRegressionSolverName
}

interface ILinearRegressionParameters extends ILinearRegressionBaseParameters {
  fitDataXType?: DenseMatrixType
  fitDataYType?: TypedArrayType
  columns?: string[]
}

interface LinearRegressionSerializedData {
  config: ILinearRegressionParameters
  data: Buffer
}

interface HasColumns {
  columns: string[] | null
}

class LinearRegression implements HasColumns {
  public static readonly className = 'LinearRegression'
  public readonly name: string = LinearRegression.className
  public readonly config: ILinearRegressionParameters = {}

  private _isFitted: boolean = false
  private estimator: RsPredictor | null = null

  constructor(params?: ILinearRegressionParameters) {
    this.config = params ?? {}
    this.config.fitDataXType = this.config.fitDataXType ?? ('F32' as DenseMatrixType)
    this.config.fitDataYType = this.config.fitDataYType ?? ('F32' as TypedArrayType)
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
    const builder = new LinearRegressionBuilder(matrix, yWrapped)
    if (this.config.solver !== undefined) {
      builder.withSolver(this.config.solver)
    }
    this.estimator = builder.build()
    this._isFitted = true
    return this
  }

  protected getComponentColumnName(index: number): string {
    return `LinearRegression${index + 1}`
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

  serialize(): LinearRegressionSerializedData {
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
    this.estimator = LibLinearRegression.deserialize(data)
    return this
  }

  static deserialize(data: LinearRegressionSerializedData): LinearRegression {
    let instance = new LinearRegression(data.config)
    instance._deserialize(data.data)
    instance._isFitted = true
    return instance
  }
}

export { LinearRegression, type ILinearRegressionBaseParameters }
