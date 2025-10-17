import { utilities, type InputType, type YType } from '../../index.js'
import { type PredictorProvider, type Predictor } from '../../estimator.js'
import { EstimatorProvidersMap, type IRidgeRegressionBaseParameters } from './estimator_providers_map/index.js'
import { DataFrame } from '../../data_frame.js'

type NumberTypeRs = 'f32' | 'f64'

interface IRidgeRegressionParameters extends IRidgeRegressionBaseParameters {
  featureType?: NumberTypeRs
  targetType?: NumberTypeRs
  columns?: string[]
}

interface RidgeRegressionSerializedData {
  config: IRidgeRegressionParameters
  data: Buffer
}

interface HasColumns {
  columns: string[] | null
}

class RidgeRegression implements HasColumns {
  public static readonly className = 'RidgeRegression'
  public readonly name: string = RidgeRegression.className
  public readonly config: IRidgeRegressionParameters = {}

  private _isFitted: boolean = false
  private estimatorProvider: PredictorProvider<IRidgeRegressionBaseParameters, any, any>
  private parameters: any
  private estimator: Predictor | null = null

  constructor(params?: IRidgeRegressionParameters) {
    this.config = params ?? {}
    this.config.featureType = this.config.featureType ?? 'f32'
    const estimatorProvidersMap = EstimatorProvidersMap.get(this.config.featureType)
    if (!estimatorProvidersMap) {
      throw new Error(`Invalid value for feature type '${this.config.featureType}'`)
    }
    this.config.targetType = this.config.targetType ?? 'f32'
    const estimatorProvider = estimatorProvidersMap.get(this.config.targetType)
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
    return `RidgeRegression${index + 1}`
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

  serialize(): RidgeRegressionSerializedData {
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

  static deserialize(data: RidgeRegressionSerializedData): RidgeRegression {
    let instance = new RidgeRegression(data.config)
    instance._deserialize(data.data)
    instance._isFitted = true
    return instance
  }
}

export { RidgeRegression, type IRidgeRegressionBaseParameters, type NumberTypeRs }
