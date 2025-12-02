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
    let matrix = utilities.inputTypeToDenseMatrix(x, {
      columns: this.config.columns,
      numberType: this.config.fitDataXType,
    })
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

  static deserialize(data: Buffer): BernoulliNB {
    const instance = new BernoulliNB()
    instance.estimator = LibBernoulliNB.deserialize(data)
    instance._isFitted = true
    return instance
  }
}

export { BernoulliNB, type IBernoulliNBBaseParameters }
