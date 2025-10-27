import { utilities, type InputType, type YType } from '../../index.js'
import { type PredictorProvider, type Predictor } from '../../estimator.js'
import {
  EstimatorProvidersMap,
  type ICategoricalNBBaseParameters,
  type XTypeStr,
} from './estimator_providers_map/index.js'
import { DataFrame } from '../../data_frame.js'

interface ICategoricalNBParameters extends ICategoricalNBBaseParameters {
  featureType?: XTypeStr
  columns?: string[]
}

interface CategoricalNBSerializedData {
  config: ICategoricalNBParameters
  data: Buffer
}

interface HasColumns {
  columns: string[] | null
}

class CategoricalNB implements HasColumns {
  public static readonly className = 'CategoricalNB'
  public readonly name: string = CategoricalNB.className
  public readonly config: ICategoricalNBParameters = {}

  private _isFitted: boolean = false
  private estimatorProvider: PredictorProvider<ICategoricalNBBaseParameters, any, any>
  private parameters: any
  private estimator: Predictor | null = null

  constructor(params?: ICategoricalNBParameters) {
    this.config = params ?? {}
    this.config.featureType = this.config.featureType ?? 'u32'
    const estimatorProvider = EstimatorProvidersMap.get(this.config.featureType)
    if (!estimatorProvider) {
      throw new Error(`Invalid value for feature type '${this.config.featureType}'`)
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
    return `CategoricalNB${index + 1}`
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
      const matrixRs = this.estimatorProvider.toMatrix(matrix)
      return this.estimator!.predict(matrixRs)
    }
    const matrixRs = this.estimatorProvider.toMatrix(utilities.inputTypeToDenseMatrix(x))
    return this.estimator!.predict(matrixRs)
  }

  serialize(): CategoricalNBSerializedData {
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

  static deserialize(data: CategoricalNBSerializedData): CategoricalNB {
    let instance = new CategoricalNB(data.config)
    instance._deserialize(data.data)
    instance._isFitted = true
    return instance
  }
}

export { CategoricalNB, type ICategoricalNBBaseParameters }
