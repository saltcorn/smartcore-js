import { utilities, type InputType, type YType } from '../index.js'
import { type RsPredictor } from '../estimator.js'
import { DataFrame } from '../data_frame.js'
import {
  MultinomialNB as LibMultinomialNB,
  MultinomialNBBuilder,
  type DenseMatrixType,
  type TypedArrayType,
} from '../core-bindings/index.js'

interface IMultinomialNBBaseParameters {
  priors?: Float64Array
  alpha?: number
  binarize?: number | bigint
}

interface IMultinomialNBParameters extends IMultinomialNBBaseParameters {
  fitDataXType?: DenseMatrixType
  fitDataYType?: TypedArrayType
  columns?: string[]
}

interface HasColumns {
  columns: string[] | null
}

class MultinomialNB implements HasColumns {
  public static readonly className = 'MultinomialNB'
  public readonly name: string = MultinomialNB.className
  public readonly config: IMultinomialNBParameters = {}

  private _isFitted: boolean = false
  private estimator: RsPredictor | null = null

  constructor(params?: IMultinomialNBParameters) {
    this.config = params ?? {}
  }

  private get fitDataXType(): DenseMatrixType {
    return this.config.fitDataXType ?? ('U32' as DenseMatrixType)
  }

  private get fitDataYType(): TypedArrayType {
    return (this.config.fitDataYType ?? 'U32') as TypedArrayType
  }

  get columns(): string[] | null {
    return this.config.columns ?? null
  }

  fit(x: InputType, y: YType): this {
    const matrix = utilities.inputTypeToDenseMatrix(x, {
      columns: this.config.columns,
      numberType: this.fitDataXType,
    })
    const yWrapped = utilities.arrayToTypedArray(y, { numberType: this.fitDataYType })
    const builder = new MultinomialNBBuilder(matrix, yWrapped)
    if (this.config.priors !== undefined) {
      builder.withPriors(this.config.priors)
    }
    if (this.config.alpha !== undefined) {
      builder.withAlpha(this.config.alpha)
    }
    this.estimator = builder.build()
    this._isFitted = true
    return this
  }

  protected getComponentColumnName(index: number): string {
    return `MultinomialNB${index + 1}`
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
      const matrix = utilities.dataFrameToDenseMatrix(x, { columns, numberType: this.fitDataXType })
      return this.estimator!.predict(matrix).field0
    }
    const matrixRs = utilities.inputTypeToDenseMatrix(x, {
      columns: this.config.columns,
      numberType: this.fitDataXType,
    })
    return this.estimator!.predict(matrixRs).field0
  }

  serialize(): Buffer {
    this.ensureFitted('serialize')
    return this.estimator!.serialize()
  }

  static deserialize(data: Buffer): MultinomialNB {
    const instance = new MultinomialNB()
    instance.estimator = LibMultinomialNB.deserialize(data)
    instance._isFitted = true
    return instance
  }
}

export { MultinomialNB, type IMultinomialNBBaseParameters }
