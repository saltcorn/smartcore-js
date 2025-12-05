import { utilities, type InputType } from '../index.js'
import { type Transformer } from '../estimator.js'
import {
  OneHotEncoder as LibOneHotEncoder,
  DenseMatrix,
  type DenseMatrixType,
  OneHotEncoderBuilder,
} from '../core-bindings/index.js'

interface IOneHotEncoderBaseParameters {
  catIdx: number[] | bigint[] | BigUint64Array
}

interface IOneHotEncoderParameters extends IOneHotEncoderBaseParameters {
  fitDataXType?: DenseMatrixType
  columns?: string[]
}

class OneHotEncoder {
  public static readonly className = 'OneHotEncoder'
  public readonly name: string = OneHotEncoder.className
  public readonly config: IOneHotEncoderParameters

  private _isFitted: boolean = false
  private estimator: Transformer | null = null

  constructor(params: IOneHotEncoderParameters) {
    this.config = params
    this.config.fitDataXType = this.config.fitDataXType ?? ('F32' as DenseMatrixType)
  }

  get columns(): string[] | null {
    return this.config.columns ?? null
  }

  fit(x: InputType): this {
    const matrix = utilities.inputTypeToDenseMatrix(x, {
      columns: this.config.columns,
      numberType: this.config.fitDataXType,
    })
    const catIdx = utilities.yAsUint64Array(this.config.catIdx)
    const builder = new OneHotEncoderBuilder(matrix, catIdx)
    this.estimator = builder.build()
    this._isFitted = true
    return this
  }

  protected getComponentColumnName(index: number): string {
    return `OneHotEncoder${index + 1}`
  }

  protected ensureFitted(methodName: string): void {
    if (!this._isFitted || this.estimator === null) {
      throw new Error(`${this.name}: Cannot call '${methodName}' before calling 'fit'. Please fit the model first.`)
    }
  }

  transform(matrix: InputType): DenseMatrix {
    this.ensureFitted('transform')
    const denseMatrix = utilities.inputTypeToDenseMatrix(matrix, { numberType: this.config.fitDataXType })
    return this.estimator!.transform(denseMatrix)
  }

  serialize(): Buffer {
    this.ensureFitted('serialize')
    return this.estimator!.serialize()
  }

  static deserialize(data: Buffer): OneHotEncoder {
    const instance = new OneHotEncoder({ catIdx: [] })
    instance.estimator = LibOneHotEncoder.deserialize(data)
    instance._isFitted = true
    return instance
  }
}

export { OneHotEncoder, type IOneHotEncoderBaseParameters }
