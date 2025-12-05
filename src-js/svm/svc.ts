import { utilities, type InputType, type YType } from '../index.js'
import { type RsPredictor } from '../estimator.js'
import { DataFrame } from '../data_frame.js'
import {
  type DenseMatrixType,
  Kernels,
  SVC as LibSVC,
  SVCBuilder,
  type TypedArrayType,
} from '../core-bindings/index.js'

interface ISVCBaseParameters {
  kernel?: Kernels
  epoch?: number | bigint
  c?: number
  tol?: number
  seed?: number | bigint
}

interface ISVCParameters extends ISVCBaseParameters {
  fitDataXType?: DenseMatrixType
  fitDataYType?: TypedArrayType
  columns?: string[]
}

interface HasColumns {
  columns: string[] | null
}

class SVC implements HasColumns {
  public static readonly className = 'SVC'
  public readonly name: string = SVC.className
  public readonly config: ISVCParameters

  private _isFitted: boolean = false
  private estimator: RsPredictor | null = null

  constructor(params?: ISVCParameters) {
    this.config = params || {}
  }

  private get fitDataXType(): DenseMatrixType {
    return this.config.fitDataXType ?? ('F64' as DenseMatrixType)
  }

  private get fitDataYType(): TypedArrayType {
    return (this.config.fitDataYType ?? 'I64') as TypedArrayType
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
    const builder = new SVCBuilder()
    if (this.config.kernel !== undefined) builder.withKernel(this.config.kernel)
    if (this.config.c !== undefined) builder.withC(utilities.wrapNumber(this.config.c))
    if (this.config.tol !== undefined) builder.withTol(utilities.wrapNumber(this.config.tol))
    if (this.config.epoch !== undefined) builder.withEpoch(BigInt(this.config.epoch))
    if (this.config.seed !== undefined) builder.withSeed(BigInt(this.config.seed))

    console.log('Matrix type: ', matrix.type())

    this.estimator = builder.build(matrix, yWrapped)
    this._isFitted = true
    return this
  }

  protected getComponentColumnName(index: number): string {
    return `SVC${index + 1}`
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

  static deserialize(data: Buffer): SVC {
    let instance = new SVC()
    instance.estimator = LibSVC.deserialize(data)
    instance._isFitted = true
    return instance
  }
}

export { SVC, type ISVCBaseParameters, Kernels }
