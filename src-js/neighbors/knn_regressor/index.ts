import { utilities, type InputType, type YType } from '../../index.js'
import { type PredictorProvider, type Predictor } from '../../estimator.js'
import {
  EstimatorProvidersMap,
  type IKNNRegressorBaseParameters,
  type MahalanobisParameters,
  type MinkowskiParameters,
  type XTypeStr,
  type YTypeStr,
} from './estimator_providers_map/index.js'
import { DataFrame } from '../../data_frame.js'
import { type DistanceType } from '../../metrics/index.js'

interface IKNNRegressorParameters
  extends IKNNRegressorBaseParameters,
    Partial<MinkowskiParameters>,
    Partial<MahalanobisParameters> {
  featureType?: XTypeStr
  targetType?: YTypeStr
  distanceType?: DistanceType
  columns?: string[]
}

interface KNNRegressorSerializedData {
  config: IKNNRegressorParameters
  data: Buffer
}

interface HasColumns {
  columns: string[] | null
}

class KNNRegressor implements HasColumns {
  public static readonly className = 'KNNRegressor'
  public readonly name: string = KNNRegressor.className
  public readonly config: IKNNRegressorParameters = {}

  private _isFitted: boolean = false
  private estimatorProvider: PredictorProvider<IKNNRegressorBaseParameters, any, any>
  private parameters: any
  private estimator: Predictor | null = null

  constructor(params?: IKNNRegressorParameters) {
    this.config = params ?? {}
    this.config.featureType = this.config.featureType ?? 'f32'
    const estimatorProvidersMap = EstimatorProvidersMap.get(this.config.featureType)
    if (!estimatorProvidersMap) {
      throw new Error(`Invalid value for feature type '${this.config.featureType}'`)
    }
    this.config.targetType = this.config.targetType ?? 'f32'
    const yEstimatorProvidersMap = estimatorProvidersMap.get(this.config.targetType)
    if (!yEstimatorProvidersMap) {
      throw new Error(`Invalid value for target type '${this.config.targetType}'`)
    }
    this.config.distanceType = this.config.distanceType ?? 'euclidian'
    const estimatorProvider = yEstimatorProvidersMap.get(this.config.distanceType)
    if (!estimatorProvider) {
      throw new Error(`Invalid value for distance type '${this.config.distanceType}'`)
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
    return `KNNRegressor${index + 1}`
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

  serialize(): KNNRegressorSerializedData {
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

  static deserialize(data: KNNRegressorSerializedData): KNNRegressor {
    let instance = new KNNRegressor(data.config)
    instance._deserialize(data.data)
    instance._isFitted = true
    return instance
  }
}

export { KNNRegressor, type IKNNRegressorBaseParameters }
