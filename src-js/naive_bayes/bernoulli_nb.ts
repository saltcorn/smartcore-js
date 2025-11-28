import { utilities, type InputType, type YType } from '../index.js'
import { type RsPredictor } from '../estimator.js'
import { DataFrame } from '../data_frame.js'
import {
  type DenseMatrixType,
  type TypedArrayType,
  BernoulliNB as LibBernoulliNB,
  BernoulliNBBuilder,
} from '../core-bindings/index.js'

interface IBernoulliNBBaseParameters {
  priors?: Float64Array | number[]
  alpha?: number
  binarize?: number | bigint
}

interface IBernoulliNBParameters extends IBernoulliNBBaseParameters {
  fitDataXType?: DenseMatrixType
  fitDataYType?: TypedArrayType
  columns?: string[]
}

interface BernoulliNBSerializedData {
  config: IBernoulliNBParameters
  data: Buffer
}

interface HasColumns {
  columns: string[] | null
}

class BernoulliNB implements HasColumns {
  public static readonly className = 'BernoulliNB'
  public readonly name: string = BernoulliNB.className
  public readonly config: IBernoulliNBParameters = {}

  private _isFitted: boolean = false
  private estimator: RsPredictor | null = null

  constructor(params?: IBernoulliNBParameters) {
    this.config = params ?? {}
    this.config.fitDataXType = this.config.fitDataXType ?? ('F32' as DenseMatrixType)
    this.config.fitDataYType = this.config.fitDataYType ?? ('U32' as TypedArrayType)
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
    const builder = new BernoulliNBBuilder(matrix, yWrapped)
    if (this.config.alpha !== undefined) {
      builder.withAlpha(this.config.alpha)
    }
    if (this.config.priors !== undefined) {
      const priors =
        this.config.priors instanceof Float64Array ? this.config.priors : Float64Array.from(this.config.priors)
      builder.withPriors(priors)
    }
    if (this.config.binarize !== undefined) {
      builder.withBinarize(utilities.wrapNumber(this.config.binarize))
    }
    this.estimator = builder.build()
    this._isFitted = true
    return this
  }

  protected getComponentColumnName(index: number): string {
    return `BernoulliNB${index + 1}`
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

  serialize(): BernoulliNBSerializedData {
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
    this.estimator = LibBernoulliNB.deserialize(data)
    return this
  }

  static deserialize(data: BernoulliNBSerializedData): BernoulliNB {
    let instance = new BernoulliNB(data.config)
    instance._deserialize(data.data)
    instance._isFitted = true
    return instance
  }
}

export { BernoulliNB, type IBernoulliNBBaseParameters }
