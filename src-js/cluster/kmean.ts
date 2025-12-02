import { utilities, type InputType, type YType } from '../index.js'
import { type RsPredictor } from '../estimator.js'
import { KMeans as KMeansV2, KMeansBuilder, type KMeansPredictOutputType } from '../core-bindings/index.js'

interface IKMeansBaseParameters {
  maxIter?: bigint | number
  k?: bigint | number
}

interface IKMeansParameters extends IKMeansBaseParameters {
  predictOutputType?: KMeansPredictOutputType
}

class KMeans {
  public static readonly className = 'KMeans'
  public readonly name: string = KMeans.className
  public readonly config: IKMeansParameters

  private _isFitted: boolean = false
  private estimator: RsPredictor | null = null

  constructor(params?: IKMeansParameters) {
    const config = params || {}
    this.config = config
  }

  fit(x: InputType): this {
    const matrix = utilities.inputTypeToDenseMatrix(x)
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
    const denseMatrix = utilities.inputTypeToDenseMatrix(matrix)
    return this.estimator!.predict(denseMatrix).field0
  }

  serialize(): Buffer {
    this.ensureFitted('serialize')
    return this.estimator!.serialize()
  }

  static deserialize(data: Buffer): KMeans {
    const instance = new KMeans()
    instance.estimator = KMeansV2.deserialize(data)
    instance._isFitted = true
    return instance
  }
}

export { KMeans }
