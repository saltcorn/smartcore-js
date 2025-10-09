import { StandardScalerF64, StandardScalerParameters } from '../core-bindings/index.js'
import { DenseMatrix } from '../linalg/index.js'
import { BaseTransformer } from '../base_transformer.js'

type StandardScalerRs = StandardScalerF64
type StandardScalerParametersRs = StandardScalerParameters

interface IStandardScalerParameters {
  columns?: string[]
}

interface StandardScalerSerializedData {
  columns: string[] | null
  data: Buffer
  params: IStandardScalerParameters
}

class StandardScaler extends BaseTransformer<StandardScalerRs, StandardScalerParametersRs> {
  public static readonly className = 'StandardScaler'
  public readonly name: string = StandardScaler.className
  private readonly config: IStandardScalerParameters

  constructor(params?: IStandardScalerParameters) {
    const parameters = new StandardScalerParameters()
    const config = params || {}

    super(parameters, config.columns)
    this.config = config
  }

  protected fitEstimator(matrix: DenseMatrix): StandardScalerF64 {
    return new StandardScalerF64(matrix.asF64(), this.parameters)
  }

  protected transformMatrix(matrix: DenseMatrix): DenseMatrix {
    return new DenseMatrix(this.estimator!.transform(matrix.asF64()))
  }

  protected getComponentColumnName(index: number): string {
    return `SS${index + 1}`
  }

  serialize(): StandardScalerSerializedData {
    this.ensureFitted('serialize')

    return {
      columns: this.columns,
      data: this.estimator!.serialize(),
      params: this.config,
    }
  }

  static deserialize(serializedData: StandardScalerSerializedData): StandardScaler {
    const estimator = StandardScalerF64.deserialize(serializedData.data)
    const instance = new StandardScaler(serializedData.params)
    instance.estimator = estimator
    instance.columns = serializedData.columns
    instance._isFitted = true
    return instance
  }
}

export default StandardScaler
