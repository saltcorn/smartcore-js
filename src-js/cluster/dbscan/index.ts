import { utilities, type InputType, type YType } from '../../index.js'
import { type IDBSCANBaseParameters } from './parameters.js'
import { type RsPredictor } from '../../estimator.js'
import { DBSCANBuilder, DBSCAN as DBSCANV2, type DistanceVariantType } from '../../core-bindings/index.js'

interface IDBSCANParameters extends IDBSCANBaseParameters {
  distanceType?: DistanceVariantType
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
  private estimator: RsPredictor | null = null

  constructor(config?: IDBSCANParameters) {
    this.config = config ?? {}
  }

  fit(x: InputType): this {
    const matrix = utilities.inputTypeToDenseMatrix(x)
    let builder = new DBSCANBuilder(matrix)
    if (this.config.algorithm) {
      builder.algorithm = this.config.algorithm
    }
    if (this.config.eps) {
      builder.eps = this.config.eps
    }
    if (this.config.minSamples) {
      builder.minSamples = this.config.minSamples
    }
    if (this.config.distanceType) {
      builder.distanceType = this.config.distanceType
    }
    this.estimator = builder.build()
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
    let denseMatrix = utilities.inputTypeToDenseMatrix(matrix)
    return this.estimator!.predict(denseMatrix).field0
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
    this.estimator = DBSCANV2.deserialize(data)
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
