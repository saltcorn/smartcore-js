import { utilities, type InputType, type YType } from '../../index.js'
import { type PredictorProvider, type Predictor } from '../../estimator.js'
import { PredictorProvidersMap, type XTypeStr, type YTypeStr } from './estimator_providers_map/index.js'
import { DataFrame } from '../../data_frame.js'

interface IExtraTreesRegressorBaseParameters {
  maxDepth?: number
  minSamplesLeaf?: bigint | number
  minSamplesSplit?: bigint | number
  nTrees?: number
  m?: number
  keepSamples?: boolean
  seed?: number
}

interface IExtraTreesRegressorParameters extends IExtraTreesRegressorBaseParameters {
  targetType?: XTypeStr
  featureType?: YTypeStr
  columns?: string[]
}

interface ExtraTreesRegressorSerializedData {
  config: IExtraTreesRegressorParameters
  data: Buffer
}

interface HasColumns {
  columns: string[] | null
}

class ExtraTreesRegressor implements HasColumns {
  public static readonly className = 'ExtraTreesRegressor'
  public readonly name: string = ExtraTreesRegressor.className
  public readonly config: IExtraTreesRegressorParameters

  private _isFitted: boolean = false
  private estimatorProvider: PredictorProvider<IExtraTreesRegressorBaseParameters, any, any>
  private parameters: any
  private estimator: Predictor | null = null

  constructor(params?: IExtraTreesRegressorParameters) {
    this.config = params || {}
    this.config.targetType = this.config.targetType ?? 'f32'
    this.config.featureType = this.config.featureType ?? 'f32'
    const estimatorProviderMap = PredictorProvidersMap.get(this.config.targetType)
    if (!estimatorProviderMap) {
      throw new Error(`Invalid value for target type '${this.config.targetType}'`)
    }
    const estimatorProvider = estimatorProviderMap.get(this.config.featureType)
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
    return `ExtraTreesRegressor${index + 1}`
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

  serialize(): ExtraTreesRegressorSerializedData {
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

  static deserialize(data: ExtraTreesRegressorSerializedData): ExtraTreesRegressor {
    let instance = new ExtraTreesRegressor(data.config)
    instance._deserialize(data.data)
    instance._isFitted = true
    return instance
  }
}

export { ExtraTreesRegressor, type IExtraTreesRegressorBaseParameters }
