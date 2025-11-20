import { utilities, type InputType } from '../../index.js'
import { type Transformer } from '../../estimator.js'
import { DataFrame } from '../../data_frame.js'
import type { NumberTypeRs } from '../index.js'
import { SVD as LibSVD, SVDBuilder, DenseMatrix } from '../../core-bindings/index.js'

interface ISVDBaseParameters {
  nComponents?: bigint
}

interface ISVDParameters extends ISVDBaseParameters {
  targetType?: NumberTypeRs
  columns?: string[]
}

interface SVDSerializedData {
  config: ISVDParameters
  data: Buffer
}

interface HasColumns {
  columns: string[] | null
}

class SVD implements HasColumns {
  public static readonly className = 'SVD'
  public readonly name: string = SVD.className
  public readonly config: ISVDParameters

  private _isFitted: boolean = false
  private estimator: Transformer | null = null

  constructor(params?: ISVDParameters) {
    this.config = params ?? {}
    this.config.targetType = this.config.targetType ?? 'f32'
  }

  get columns(): string[] | null {
    return this.config.columns ?? null
  }

  fit(x: InputType): this {
    let matrix
    if (x instanceof DataFrame && this.columns !== null && this.columns.length !== 0)
      matrix = utilities.dataFrameToDenseMatrix(x, this.columns)
    else matrix = utilities.inputTypeToDenseMatrix(x)
    const builder = new SVDBuilder(matrix)
    if (this.config.nComponents) {
      builder.withNComponents(this.config.nComponents)
    }
    this.estimator = builder.build()
    this._isFitted = true
    return this
  }

  protected getComponentColumnName(index: number): string {
    return `SVD${index + 1}`
  }

  protected ensureFitted(methodName: string): void {
    if (!this._isFitted || this.estimator === null) {
      throw new Error(`${this.name}: Cannot call '${methodName}' before calling 'fit'. Please fit the model first.`)
    }
  }

  transform(x: InputType): DenseMatrix | DataFrame {
    this.ensureFitted('transform')
    if (x instanceof DataFrame) {
      const columns = Array.isArray(this.columns) ? this.columns : x.columnNames
      const matrix = utilities.dataFrameToDenseMatrix(x, columns)
      const transformedMatrix = this.estimator!.transform(matrix)
      const transformed = utilities.denseMatrixToDataFrame(transformedMatrix, columns)
      const remaining = utilities.getRemainingColumns(x, columns)
      return utilities.combineDataFrames(transformed, remaining)
    }
    const matrixRs = utilities.inputTypeToDenseMatrix(x)
    return this.estimator!.transform(matrixRs)
  }

  serialize(): SVDSerializedData {
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
    this.estimator = LibSVD.deserialize(data)
    return this
  }

  static deserialize(data: SVDSerializedData): SVD {
    let instance = new SVD(data.config)
    instance._deserialize(data.data)
    instance._isFitted = true
    return instance
  }
}

export { SVD, type ISVDBaseParameters }
