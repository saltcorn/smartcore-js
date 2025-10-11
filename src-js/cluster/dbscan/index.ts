import { type InputType, type YType } from '../../index.js'
import {
  type EstimatorProvider,
  type IDBSCANBaseParameters,
  type NumberTypeRs,
  type DistanceType,
  type Estimator,
  EstimatorProviders,
} from './estimator_providers.js'

interface IDBSCANParameters extends IDBSCANBaseParameters {
  numberType?: NumberTypeRs
  distanceType?: DistanceType
}

interface DBSCANSerializedData {
  config: IDBSCANParameters
  data: Buffer
}

class DBSCAN {
  public static readonly className = 'DBSCAN'
  public readonly name: string = DBSCAN.className
  public readonly config: IDBSCANParameters

  private _isFitted: boolean = false
  private estimatorProvider: EstimatorProvider<IDBSCANBaseParameters, any, any>
  private parameters: any
  private estimator: Estimator | null = null

  constructor(params?: IDBSCANParameters) {
    const config = params || {}
    this.config = config
    this.config.numberType = this.config.numberType ?? 'f32'
    this.config.distanceType = this.config.distanceType ?? 'euclidian'
    const distanceTypeMap = EstimatorProviders.get(this.config.numberType)
    if (!distanceTypeMap) {
      throw new Error(`Unknown number type '${this.config.numberType}'`)
    }
    const estimatorProvider = distanceTypeMap.get(this.config.distanceType)
    if (!estimatorProvider) {
      throw new Error(`Unknown distance type '${this.config.distanceType}' for '${this.config.numberType}'`)
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
    return `DBSCAN${index + 1}`
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

  serialize(): DBSCANSerializedData {
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

  static deserialize(data: DBSCANSerializedData): DBSCAN {
    let instance = new DBSCAN(data.config)
    instance._deserialize(data.data)
    instance._isFitted = true
    return instance
  }
}

export { DBSCAN }
