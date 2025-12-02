import { utilities, type InputType, type YType } from '../index.js'
import { type RsPredictor } from '../estimator.js'
import { DataFrame } from '../data_frame.js'
import {
  type DenseMatrixType,
  type TypedArrayType,
  CategoricalNB as LibCategoricalNB,
  CategoricalNBBuilder,
} from '../core-bindings/index.js'

interface ICategoricalNBBaseParameters {
  alpha?: number
}

interface ICategoricalNBParameters extends ICategoricalNBBaseParameters {
  fitDataXType?: DenseMatrixType
  columns?: string[]
}

interface HasColumns {
  columns: string[] | null
}

class CategoricalNB implements HasColumns {
  public static readonly className = 'CategoricalNB'
  public readonly name: string = CategoricalNB.className
  public readonly config: ICategoricalNBParameters = {}

  private _isFitted: boolean = false
  private estimator: RsPredictor | null = null

  constructor(params?: ICategoricalNBParameters) {
    this.config = params ?? {}
    this.config.fitDataXType = this.config.fitDataXType ?? ('U32' as DenseMatrixType)
  }

  get columns(): string[] | null {
    return this.config.columns ?? null
  }

  fit(x: InputType, y: YType): this {
    let matrix = utilities.inputTypeToDenseMatrix(x, {
      columns: this.config.columns,
      numberType: this.config.fitDataXType,
    })
    const yWrapped = utilities.wrapTypedArray(
      utilities.arrayToTypedArray(y, {
        numberType: this.config.fitDataXType ? (this.config.fitDataXType as unknown as TypedArrayType) : undefined,
      }),
    )
    const builder = new CategoricalNBBuilder(matrix, yWrapped)
    if (this.config.alpha !== undefined) {
      builder.withAlpha(this.config.alpha)
    }
    this.estimator = builder.build()
    this._isFitted = true
    return this
  }

  protected getComponentColumnName(index: number): string {
    return `CategoricalNB${index + 1}`
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

  static deserialize(data: Buffer): CategoricalNB {
    const instance = new CategoricalNB()
    instance.estimator = LibCategoricalNB.deserialize(data)
    instance._isFitted = true
    return instance
  }
}

export { CategoricalNB, type ICategoricalNBBaseParameters }
