import { PCAF64, PCAParameters } from '../core-bindings/index.js'
import { DenseMatrix } from '../linalg/index.js'
import { BaseTransformer } from '../base_transformer.js'

interface PCAParams {
  nComponents?: number
  correlationMatrix?: boolean
}

interface PCASerializedData {
  columns: string[] | null
  data: Buffer
  params: PCAParams
}

type PCARs = PCAF64
type PCAParametersRs = PCAParameters

class PCA extends BaseTransformer<PCARs, PCAParametersRs> {
  public static readonly className = 'PCA'
  public readonly name: string = PCA.className

  private readonly config: PCAParams

  constructor(params?: PCAParams) {
    const parameters = new PCAParameters()

    // Store config for serialization
    const config = params || {}

    if (config.nComponents !== undefined) {
      parameters.withNComponents(config.nComponents)
    }
    if (config.correlationMatrix !== undefined) {
      parameters.useCorrelationMatrix(config.correlationMatrix)
    }

    super(parameters)
    this.config = config
  }

  protected fitEstimator(matrix: DenseMatrix): PCAF64 {
    return PCAF64.fit(matrix.asF64(), this.parameters)
  }

  protected transformMatrix(matrix: DenseMatrix): DenseMatrix {
    return new DenseMatrix(this.estimator!.transform(matrix.asF64()))
  }

  protected getComponentColumnName(index: number): string {
    return `PC${index + 1}`
  }

  serialize(): PCASerializedData {
    this.ensureFitted('serialize')

    return {
      columns: this.columns,
      data: this.estimator!.serialize(),
      params: this.config,
    }
  }

  /**
   * Creates instance from serialized data
   */
  static deserialize(serializedData: PCASerializedData): PCA {
    const estimator = PCAF64.deserialize(serializedData.data)
    const instance = new PCA(serializedData.params)
    instance.estimator = estimator
    instance.columns = serializedData.columns
    instance._isFitted = true
    return instance
  }
}

export { PCA }
