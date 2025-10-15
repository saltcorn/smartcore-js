import { type InputType, type YType } from '../../index.js'
import { type IKMeansBaseParameters, type NumberTypeRs } from './parameters.js'
import { type PredictorProvider, type Predictor } from '../../estimator.js'
import { PredictorProvidersMap, type PredictOutputType } from './estimator_providers_map/index.js'

interface IKMeansParameters extends IKMeansBaseParameters {
  targetType?: NumberTypeRs
  predictOutputType?: PredictOutputType
}

interface KMeansSerializedData {
  config: IKMeansParameters
  data: Buffer
}

class KMeans {
  public static readonly className = 'KMeans'
  public readonly name: string = KMeans.className
  public readonly config: IKMeansParameters

  private _isFitted: boolean = false
  private estimatorProvider: PredictorProvider<IKMeansBaseParameters, any, any>
  private parameters: any
  private estimator: Predictor | null = null

  constructor(params?: IKMeansParameters) {
    const config = params || {}
    this.config = config
    this.config.targetType = this.config.targetType ?? 'f32'
    this.config.predictOutputType = this.config.predictOutputType ?? 'i32'
    const distanceTypeMap = PredictorProvidersMap.get(this.config.targetType)
    if (!distanceTypeMap) {
      throw new Error(`Invalid value for target type '${this.config.targetType}'`)
    }
    const estimatorProvider = distanceTypeMap.get(this.config.predictOutputType)
    if (!estimatorProvider) {
      throw new Error(
        `Invalid value for predict output type '${this.config.predictOutputType}' for '${this.config.targetType}'`,
      )
    }
    const parameters = estimatorProvider.parameters(this.config)
    this.estimatorProvider = estimatorProvider
    this.parameters = parameters
  }

  fit(x: InputType, y: YType): this {
    this.estimator = this.estimatorProvider.estimator(x, y, this.parameters)
    this._isFitted = true
    return this
  }

  protected getComponentColumnName(index: number): string {
    return `KMeans${index + 1}`
  }

  protected ensureFitted(methodName: string): void {
    if (!this._isFitted || this.estimator === null) {
      throw new Error(`${this.name}: Cannot call '${methodName}' before calling 'fit'. Please fit the model first.`)
    }
  }

  predict(matrix: InputType): YType {
    this.ensureFitted('predict')
    let denseMatrix = this.estimatorProvider.toMatrix(matrix)
    return this.estimator!.predict(denseMatrix)
  }

  serialize(): KMeansSerializedData {
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

  static deserialize(data: KMeansSerializedData): KMeans {
    let instance = new KMeans(data.config)
    instance._deserialize(data.data)
    instance._isFitted = true
    return instance
  }
}

export { KMeans }
