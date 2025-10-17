import { DenseMatrix, utilities, type InputType, type YType } from '../../index.js'
import { type TransformerProvider, type Transformer } from '../../estimator.js'
import { TransformerProvidersMap } from './estimator_providers_map/index.js'
import { DataFrame } from '../../data_frame.js'

type NumberTypeRs = 'f32' | 'f64'

interface IPCABaseParameters {
  nComponents?: number
  correlationMatrix?: boolean
}

interface IPCAParameters extends IPCABaseParameters {
  targetType?: NumberTypeRs
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
  private estimatorProvider: TransformerProvider<IPCABaseParameters, any, any>
  private parameters: any
  private estimator: Transformer | null = null

  constructor(params: IPCAParameters) {
    this.config = params
    this.config.targetType = this.config.targetType ?? 'f32'
    const estimatorProvider = TransformerProvidersMap.get(this.config.targetType)
    if (!estimatorProvider) {
      throw new Error(`Invalid value for target type '${this.config.targetType}'`)
    }
    const parameters = estimatorProvider.parameters(this.config)
    this.estimatorProvider = estimatorProvider
    this.parameters = parameters
  }

  get columns(): string[] | null {
    return this.config.columns ?? null
  }

  fit(x: InputType, y: YType): this {
    let matrix
    if (x instanceof DataFrame && this.columns !== null && this.columns.length !== 0)
      matrix = utilities.dataFrameToDenseMatrix(x, this.columns)
    else matrix = utilities.inputTypeToDenseMatrix(x)
    this.estimator = this.estimatorProvider.estimator(matrix, y, this.parameters)
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
      const matrix = utilities.dataFrameToDenseMatrix(x, columns)
      const matrixRs = this.estimatorProvider.toMatrix(matrix)
      const transformedMatrix = this.estimator!.transform(matrixRs)
      const transformed = utilities.denseMatrixToDataFrame(new DenseMatrix(transformedMatrix), columns)
      const remaining = utilities.getRemainingColumns(x, columns)
      return utilities.combineDataFrames(transformed, remaining)
    }
    const matrixRs = this.estimatorProvider.toMatrix(utilities.inputTypeToDenseMatrix(x))
    return new DenseMatrix(this.estimator!.transform(matrixRs))
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
    this.estimator = this.estimatorProvider.deserialize(data)
    return this
  }

  static deserialize(data: PCASerializedData): PCA {
    let instance = new PCA(data.config)
    instance._deserialize(data.data)
    instance._isFitted = true
    return instance
  }
}

export { PCA, type IPCABaseParameters, type NumberTypeRs }
