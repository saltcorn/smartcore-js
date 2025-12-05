import { utilities, type InputType, type YType } from '../index.js'
import { type RsPredictor } from '../estimator.js'
import { DataFrame } from '../data_frame.js'
import {
  type DenseMatrixType,
  Kernels,
  SVR as LibSVR,
  SVRBuilder,
  type TypedArrayType,
} from '../core-bindings/index.js'

interface ISVRBaseParameters {
  kernel?: Kernels
  eps?: number
  c?: number
  tol?: number
}

interface ISVRParameters extends ISVRBaseParameters {
  fitDataXType?: DenseMatrixType
  columns?: string[]
}

interface HasColumns {
  columns: string[] | null
}

class SVR implements HasColumns {
  public static readonly className = 'SVR'
  public readonly name: string = SVR.className
  public readonly config: ISVRParameters

  private _isFitted: boolean = false
  private estimator: RsPredictor | null = null

  constructor(params?: ISVRParameters) {
    this.config = params || {}
  }

  private get fitDataXType(): DenseMatrixType {
    return this.config.fitDataXType ?? ('F64' as DenseMatrixType)
  }

  get columns(): string[] | null {
    return this.config.columns ?? null
  }

  fit(x: InputType, y: YType): this {
    let matrix = utilities.inputTypeToDenseMatrix(x, {
      columns: this.config.columns,
      numberType: this.fitDataXType,
    })
    const yNumberType =
      this.fitDataXType === ('F64' as DenseMatrixType)
        ? ('F64' as TypedArrayType)
        : this.fitDataXType === ('F32' as DenseMatrixType)
          ? ('F32' as TypedArrayType)
          : null
    if (yNumberType === null) throw new Error("Supported typed for 'fitDataXType' are 'F32' or 'F64'")
    const yWrapped = utilities.arrayToTypedArray(y, { numberType: yNumberType })
    const builder = new SVRBuilder()
    if (this.config.kernel !== undefined) builder.withKernel(this.config.kernel)
    if (this.config.c !== undefined) builder.withC(utilities.wrapNumber(this.config.c))
    if (this.config.tol !== undefined) builder.withTol(utilities.wrapNumber(this.config.tol))
    if (this.config.eps !== undefined) builder.withEps(utilities.wrapNumber(this.config.eps))

    this.estimator = builder.build(matrix, yWrapped)
    this._isFitted = true
    return this
  }

  protected getComponentColumnName(index: number): string {
    return `SVR${index + 1}`
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

  static deserialize(data: Buffer): SVR {
    let instance = new SVR()
    instance.estimator = LibSVR.deserialize(data)
    instance._isFitted = true
    return instance
  }
}

export { SVR, type ISVRBaseParameters, Kernels }
