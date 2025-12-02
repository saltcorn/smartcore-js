import { utilities, type InputType } from '../index.js'
import { type Transformer } from '../estimator.js'
import {
  DenseMatrix,
  StandardScaler as LibStandardScaler,
  StandardScalerBuilder,
  type DenseMatrixType,
} from '../core-bindings/index.js'

interface IStandardScalerBaseParameters {}

interface IStandardScalerParameters extends IStandardScalerBaseParameters {
  fitDataXType?: DenseMatrixType
  columns?: string[]
}

class StandardScaler {
  public static readonly className = 'StandardScaler'
  public readonly name: string = StandardScaler.className
  public readonly config: IStandardScalerParameters

  private _isFitted: boolean = false
  private estimator: Transformer | null = null

  constructor(params?: IStandardScalerParameters) {
    const config = params || {}
    this.config = config
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
    this.estimator = new StandardScalerBuilder(matrix).build()
    this._isFitted = true
    return this
  }

  protected getComponentColumnName(index: number): string {
    return `StandardScaler${index + 1}`
  }

  protected ensureFitted(methodName: string): void {
    if (!this._isFitted || this.estimator === null) {
      throw new Error(`${this.name}: Cannot call '${methodName}' before calling 'fit'. Please fit the model first.`)
    }
  }

  transform(matrix: InputType): DenseMatrix {
    this.ensureFitted('transform')
    const denseMatrix = utilities.inputTypeToDenseMatrix(matrix, {
      numberType: this.config.fitDataXType,
      columns: this.config.columns,
    })
    return this.estimator!.transform(denseMatrix)
  }

  serialize(): Buffer {
    this.ensureFitted('serialize')
    return this.estimator!.serialize()
  }

  static deserialize(data: Buffer): StandardScaler {
    const instance = new StandardScaler()
    instance.estimator = LibStandardScaler.deserialize(data)
    instance._isFitted = true
    return instance
  }
}

export { StandardScaler, type IStandardScalerBaseParameters }
