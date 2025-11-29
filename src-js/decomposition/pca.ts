import { utilities, type InputType } from '../index.js'
import { type Transformer } from '../estimator.js'
import { DataFrame } from '../data_frame.js'
import { DenseMatrix, PCABuilder, PCA as LibPCA, type DenseMatrixType } from '../core-bindings/index.js'

interface IPCABaseParameters {
  nComponents?: number | bigint
  useCorrelationMatrix?: boolean
}

interface IPCAParameters extends IPCABaseParameters {
  fitDataXType?: DenseMatrixType
  columns?: string[]
}

interface PCASerializedData {
  config: IPCAParameters
  data: Buffer
}

interface HasColumns {
  columns: string[] | null
}

class PCA implements HasColumns {
  public static readonly className = 'PCA'
  public readonly name: string = PCA.className
  public readonly config: IPCAParameters

  private _isFitted: boolean = false
  private estimator: Transformer | null = null

  constructor(params: IPCAParameters) {
    this.config = params
    this.config.fitDataXType = this.config.fitDataXType ?? ('F32' as DenseMatrixType)
  }

  get columns(): string[] | null {
    return this.config.columns ?? null
  }

  fit(x: InputType): this {
    let matrix = utilities.inputTypeToDenseMatrix(x, {
      columns: this.config.columns,
      numberType: this.config.fitDataXType,
    })
    let builder = new PCABuilder(matrix)
    if (this.config.nComponents !== undefined) {
      builder.withNComponents(BigInt(this.config.nComponents))
    }
    if (this.config.useCorrelationMatrix !== undefined) {
      builder.useCorrelationMatrix(this.config.useCorrelationMatrix)
    }
    this.estimator = builder.build()
    this._isFitted = true
    return this
  }

  protected getComponentColumnName(index: number): string {
    return `PCA${index + 1}`
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
    const matrixRs = utilities.inputTypeToDenseMatrix(x, {
      columns: this.config.columns,
      numberType: this.config.fitDataXType,
    })
    return this.estimator!.transform(matrixRs)
  }

  serialize(): PCASerializedData {
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
    this.estimator = LibPCA.deserialize(data)
    return this
  }

  static deserialize(data: PCASerializedData): PCA {
    let instance = new PCA(data.config)
    instance._deserialize(data.data)
    instance._isFitted = true
    return instance
  }
}

export { PCA, type IPCABaseParameters }
