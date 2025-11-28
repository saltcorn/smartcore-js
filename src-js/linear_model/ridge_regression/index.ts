import { utilities, type InputType, type YType } from '../../index.js'
import { type RsPredictor } from '../../estimator.js'
import { DataFrame } from '../../data_frame.js'
import {
  type RidgeRegressionSolverName,
  type DenseMatrixType,
  type TypedArrayType,
  RidgeRegression as LibRidgeRegression,
  RidgeRegressionBuilder,
} from '../../core-bindings/index.js'

interface IRidgeRegressionBaseParameters {
  alpha?: number | bigint
  normalize?: boolean
  solver?: RidgeRegressionSolverName
}

interface IRidgeRegressionParameters extends IRidgeRegressionBaseParameters {
  fitDataXType?: DenseMatrixType
  fitDataYType?: TypedArrayType
  columns?: string[]
}

interface RidgeRegressionSerializedData {
  config: IRidgeRegressionParameters
  data: Buffer
}

interface HasColumns {
  columns: string[] | null
}

class RidgeRegression implements HasColumns {
  public static readonly className = 'RidgeRegression'
  public readonly name: string = RidgeRegression.className
  public readonly config: IRidgeRegressionParameters = {}

  private _isFitted: boolean = false
  private estimator: RsPredictor | null = null

  constructor(params?: IRidgeRegressionParameters) {
    this.config = params ?? {}
    this.config.fitDataXType = this.config.fitDataXType ?? ('F32' as DenseMatrixType)
    this.config.fitDataYType = this.config.fitDataYType ?? ('F32' as TypedArrayType)
  }

  get columns(): string[] | null {
    return this.config.columns ?? null
  }

  fit(x: InputType, y: YType): this {
    let matrix
    if (x instanceof DataFrame && this.columns !== null && this.columns.length !== 0)
      matrix = utilities.dataFrameToDenseMatrix(x, this.columns)
    else matrix = utilities.inputTypeToDenseMatrix(x)
    const yWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(y, { numberType: this.config.fitDataYType }))
    const builder = new RidgeRegressionBuilder(matrix, yWrapped)
    if (this.config.alpha !== undefined) {
      builder.withAlpha(utilities.wrapNumber(this.config.alpha))
    }
    if (this.config.solver !== undefined) {
      builder.withSolver(this.config.solver)
    }
    if (this.config.normalize !== undefined) {
      builder.withNormalize(this.config.normalize)
    }
    this.estimator = builder.build()
    this._isFitted = true
    return this
  }

  protected getComponentColumnName(index: number): string {
    return `RidgeRegression${index + 1}`
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

  serialize(): RidgeRegressionSerializedData {
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
    this.estimator = LibRidgeRegression.deserialize(data)
    return this
  }

  static deserialize(data: RidgeRegressionSerializedData): RidgeRegression {
    let instance = new RidgeRegression(data.config)
    instance._deserialize(data.data)
    instance._isFitted = true
    return instance
  }
}

export { RidgeRegression, type IRidgeRegressionBaseParameters }
