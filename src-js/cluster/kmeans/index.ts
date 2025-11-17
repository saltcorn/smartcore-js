import { utilities, type InputType, type YType } from '../../index.js'
import { type IKMeansBaseParameters } from './parameters.js'
import { type PredictorV2 } from '../../estimator.js'
import { KMeans as KMeansV2, KMeansBuilder, type PredictOutputType } from '../../core-bindings/index.js'

interface IKMeansParameters extends IKMeansBaseParameters {
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
  private estimator: PredictorV2 | null = null

  constructor(params?: IKMeansParameters) {
    const config = params || {}
    this.config = config
  }

  fit(x: InputType): this {
    const matrix = utilities.inputTypeToDenseMatrix(x).asDenseMatrixV2()
    const builder = new KMeansBuilder(matrix)
    if (this.config.maxIter) {
      builder.withMaxIter(BigInt(this.config.maxIter))
    }
    if (this.config.k) {
      builder.withK(BigInt(this.config.k))
    }
    if (this.config.predictOutputType) {
      builder.withPredictOutputType(this.config.predictOutputType)
    }
    this.estimator = builder.build()
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
    let denseMatrix = utilities.inputTypeToDenseMatrix(matrix).asDenseMatrixV2()
    return this.estimator!.predict(denseMatrix).field0
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
    this.estimator = KMeansV2.deserialize(data)
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
