import { utilities, type InputType, type YType } from '../../index.js'
import { type RsPredictor } from '../../estimator.js'
import { DataFrame } from '../../data_frame.js'
import {
  ElasticNet as LibElasticNet,
  ElasticNetBuilder,
  type DenseMatrixType,
  type TypedArrayType,
} from '../../core-bindings/index.js'

interface IElasticNetBaseParameters {
  alpha?: number
  l1Ratio?: number
  normalize?: boolean
  tol?: number
  maxIter?: bigint | number
}

interface IElasticNetParameters extends IElasticNetBaseParameters {
  fitDataXType?: DenseMatrixType
  fitDataYType?: TypedArrayType
  columns?: string[]
}

interface ElasticNetSerializedData {
  config: IElasticNetParameters
  data: Buffer
}

interface HasColumns {
  columns: string[] | null
}

class ElasticNet implements HasColumns {
  public static readonly className = 'ElasticNet'
  public readonly name: string = ElasticNet.className
  public readonly config: IElasticNetParameters = {}

  private _isFitted: boolean = false
  private estimator: RsPredictor | null = null

  constructor(params?: IElasticNetParameters) {
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
    const builder = new ElasticNetBuilder(matrix, yWrapped)
    if (this.config.alpha !== undefined) builder.withAlpha(this.config.alpha)
    if (this.config.l1Ratio !== undefined) builder.withL1Ratio(this.config.l1Ratio)
    if (this.config.normalize !== undefined) builder.withNormalize(this.config.normalize)
    if (this.config.tol !== undefined) builder.withTol(this.config.tol)
    if (this.config.maxIter !== undefined) builder.withMaxIter(BigInt(this.config.maxIter))
    this.estimator = builder.build()
    this._isFitted = true
    return this
  }

  protected getComponentColumnName(index: number): string {
    return `ElasticNet${index + 1}`
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

  serialize(): ElasticNetSerializedData {
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
    this.estimator = LibElasticNet.deserialize(data)
    return this
  }

  static deserialize(data: ElasticNetSerializedData): ElasticNet {
    let instance = new ElasticNet(data.config)
    instance._deserialize(data.data)
    instance._isFitted = true
    return instance
  }
}

export { ElasticNet, type IElasticNetBaseParameters }
