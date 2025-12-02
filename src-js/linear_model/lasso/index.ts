import { utilities, type InputType, type YType } from '../../index.js'
import { type RsPredictor } from '../../estimator.js'
import { DataFrame } from '../../data_frame.js'
import {
  Lasso as LibLasso,
  LassoBuilder,
  type DenseMatrixType,
  type TypedArrayType,
} from '../../core-bindings/index.js'

interface ILassoBaseParameters {
  alpha?: number
  normalize?: boolean
  tol?: number
  maxIter?: bigint | number
}

interface ILassoParameters extends ILassoBaseParameters {
  fitDataXType?: DenseMatrixType
  fitDataYType?: TypedArrayType
  columns?: string[]
}

interface LassoSerializedData {
  config: ILassoParameters
  data: Buffer
}

interface HasColumns {
  columns: string[] | null
}

class Lasso implements HasColumns {
  public static readonly className = 'Lasso'
  public readonly name: string = Lasso.className
  public readonly config: ILassoParameters = {}

  private _isFitted: boolean = false
  private estimator: RsPredictor | null = null

  constructor(params?: ILassoParameters) {
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
    const builder = new LassoBuilder(matrix, yWrapped)
    if (this.config.alpha !== undefined) builder.withAlpha(this.config.alpha)
    if (this.config.normalize !== undefined) builder.withNormalize(this.config.normalize)
    if (this.config.tol !== undefined) builder.withTol(this.config.tol)
    if (this.config.maxIter !== undefined) builder.withMaxIter(BigInt(this.config.maxIter))
    this.estimator = builder.build()
    this._isFitted = true
    return this
  }

  protected getComponentColumnName(index: number): string {
    return `Lasso${index + 1}`
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

  serialize(): LassoSerializedData {
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
    this.estimator = LibLasso.deserialize(data)
    return this
  }

  static deserialize(data: LassoSerializedData): Lasso {
    let instance = new Lasso(data.config)
    instance._deserialize(data.data)
    instance._isFitted = true
    return instance
  }
}

export { Lasso, type ILassoBaseParameters }
