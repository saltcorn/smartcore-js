import { utilities, type InputType } from '../index.js'
import { type Transformer } from '../estimator.js'
import { DataFrame } from '../data_frame.js'
import { SVD as LibSVD, SVDBuilder, DenseMatrix, type DenseMatrixType } from '../core-bindings/index.js'

interface ISVDBaseParameters {
  nComponents?: bigint
}

interface ISVDParameters extends ISVDBaseParameters {
  fitDataXType?: DenseMatrixType
  columns?: string[]
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
      const matrix = utilities.dataFrameToDenseMatrix(x, { columns, numberType: this.config.fitDataXType })
      const transformedMatrix = this.estimator!.transform(matrix)
      const transformed = utilities.denseMatrixToDataFrame(transformedMatrix, columns)
      const remaining = utilities.getRemainingColumns(x, columns)
      return utilities.combineDataFrames(transformed, remaining)
    }
    const matrixRs = utilities.inputTypeToDenseMatrix(x)
    return this.estimator!.transform(matrixRs)
  }

  serialize(): Buffer {
    this.ensureFitted('serialize')
    return this.estimator!.serialize()
  }

  static deserialize(data: Buffer): SVD {
    const instance = new SVD()
    instance.estimator = LibSVD.deserialize(data)
    instance._isFitted = true
    return instance
  }
}

export { SVD, type ISVDBaseParameters }
