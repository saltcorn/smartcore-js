import { utilities, type InputType } from '../../index.js'
import { type Transformer } from '../../estimator.js'
import {
  DenseMatrix,
  StandardScaler as LibStandardScaler,
  StandardScalerBuilder,
  type DenseMatrixType,
} from '../../core-bindings/index.js'

interface IStandardScalerBaseParameters {}

interface IStandardScalerParameters extends IStandardScalerBaseParameters {
  fitDataXType?: DenseMatrixType
  columns?: string[]
}

interface StandardScalerSerializedData {
  config: IStandardScalerParameters
  data: Buffer
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
    let denseMatrix = utilities.inputTypeToDenseMatrix(matrix, {
      numberType: this.config.fitDataXType,
      columns: this.config.columns,
    })
    return this.estimator!.transform(denseMatrix)
  }

  serialize(): StandardScalerSerializedData {
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
    this.estimator = LibStandardScaler.deserialize(data)
    return this
  }

  static deserialize(data: StandardScalerSerializedData): StandardScaler {
    let instance = new StandardScaler(data.config)
    instance._deserialize(data.data)
    instance._isFitted = true
    return instance
  }
}

export { StandardScaler, type IStandardScalerBaseParameters }
