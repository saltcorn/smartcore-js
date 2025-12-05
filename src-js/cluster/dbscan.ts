import { utilities, type InputType, type YType } from '../index.js'
import { type RsPredictor } from '../estimator.js'
import {
  DBSCANBuilder,
  DBSCAN as DBSCANV2,
  type KNNAlgorithmName,
  type DistanceVariantType,
} from '../core-bindings/index.js'

interface IDBSCANBaseParameters {
  minSamples?: bigint
  algorithm?: KNNAlgorithmName
  eps?: number
  data?: InputType
  p?: number
}

interface IDBSCANParameters extends IDBSCANBaseParameters {
  distanceType?: DistanceVariantType
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
      builder.withAlgorithm(this.config.algorithm)
    }
    if (this.config.eps) {
      builder.withEps(this.config.eps)
    }
    if (this.config.minSamples) {
      builder.withMinSamples(this.config.minSamples)
    }
    if (this.config.distanceType) {
      builder.withDistanceType(this.config.distanceType)
    }
    if (this.config.p !== undefined) {
      builder.withP(this.config.p)
    }
    if (this.config.data !== undefined) {
      builder.withData(utilities.inputTypeToDenseMatrix(this.config.data))
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
    const denseMatrix = utilities.inputTypeToDenseMatrix(matrix)
    return this.estimator!.predict(denseMatrix).field0
  }

  serialize(): Buffer {
    this.ensureFitted('serialize')
    return this.estimator!.serialize()
  }

  static deserialize(data: Buffer): DBSCAN {
    const instance = new DBSCAN()
    instance.estimator = DBSCANV2.deserialize(data)
    instance._isFitted = true
    return instance
  }
}

export { DBSCAN }
