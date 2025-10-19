import { DenseMatrix, utilities, type InputType, type YType } from '../../index.js'
import { type TransformerProvider, type Transformer } from '../../estimator.js'
import { TransformerProvidersMap } from './estimator_providers_map/index.js'

type NumberTypeRs = 'f32' | 'f64'

interface IStandardScalerBaseParameters {}

interface IStandardScalerParameters extends IStandardScalerBaseParameters {
  targetType?: NumberTypeRs
}

interface StandardScalerSerializedData {
  config: IStandardScalerParameters
  data: Buffer
}

class StandardScaler {
  public static readonly className = 'StandardScaler'
  public readonly name: string = StandardScaler.className
  public readonly config: IStandardScalerParameters

  private _isFitted: boolean = false
  private estimatorProvider: TransformerProvider<IStandardScalerBaseParameters, any, any>
  private parameters: any
  private estimator: Transformer | null = null

  constructor(params?: IStandardScalerParameters) {
    const config = params || {}
    this.config = config
    this.config.targetType = this.config.targetType ?? 'f32'
    const estimatorProvider = TransformerProvidersMap.get(this.config.targetType)
    if (!estimatorProvider) {
      throw new Error(`Invalid value for target type '${this.config.targetType}'`)
    }
    const parameters = estimatorProvider.parameters(this.config)
    this.estimatorProvider = estimatorProvider
    this.parameters = parameters
  }

  fit(x: InputType, y: YType): this {
    const matrix = utilities.inputTypeToDenseMatrix(x)
    this.estimator = this.estimatorProvider.estimator(matrix, y, this.parameters)
    this._isFitted = true
    return this
  }

  protected getComponentColumnName(index: number): string {
    return `StandardScaler${index + 1}`
  }

  protected ensureFitted(methodName: string): void {
    if (!this._isFitted || this.estimator === null) {
      throw new Error(`${this.name}: Cannot call '${methodName}' before calling 'fit'. Please fit the model first.`)
    }
  }

  transform(matrix: InputType): DenseMatrix {
    this.ensureFitted('transform')
    let denseMatrix = this.estimatorProvider.toMatrix(utilities.inputTypeToDenseMatrix(matrix))
    return new DenseMatrix(this.estimator!.transform(denseMatrix))
  }

  serialize(): StandardScalerSerializedData {
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

  static deserialize(data: StandardScalerSerializedData): StandardScaler {
    let instance = new StandardScaler(data.config)
    instance._deserialize(data.data)
    instance._isFitted = true
    return instance
  }
}

export { StandardScaler, type IStandardScalerBaseParameters, type NumberTypeRs }
