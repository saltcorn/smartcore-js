import { utilities, type InputType, type YType } from '../index.js'
import { type RsPredictor } from '../estimator.js'
import { DataFrame } from '../data_frame.js'
import {
  ElasticNet as LibElasticNet,
  ElasticNetBuilder,
  type DenseMatrixType,
  type TypedArrayType,
} from '../core-bindings/index.js'

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
  }

  private get fitDataXType(): DenseMatrixType {
    return this.config.fitDataXType ?? ('F32' as DenseMatrixType)
  }

  private get fitDataYType(): TypedArrayType {
    return (this.config.fitDataYType ?? 'F32') as TypedArrayType
  }

  get columns(): string[] | null {
    return this.config.columns ?? null
  }

  fit(x: InputType, y: YType): this {
    let matrix = utilities.inputTypeToDenseMatrix(x, {
      columns: this.config.columns,
      numberType: this.fitDataXType,
    })
    const yWrapped = utilities.arrayToTypedArray(y, { numberType: this.fitDataYType })
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

  static deserialize(data: Buffer): ElasticNet {
    const instance = new ElasticNet()
    instance.estimator = LibElasticNet.deserialize(data)
    instance._isFitted = true
    return instance
  }
}

export { ElasticNet, type IElasticNetBaseParameters }
