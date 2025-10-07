import { SVDF64, SVDParameters } from '../core-bindings/index.js'
import { DenseMatrix } from '../linalg/index.js'
import { BaseTransformer } from '../base_transformer.js'

interface SVDParams {
  nComponents?: number
  columns?: string[]
}

interface SVDSerializedData {
  columns: string[] | null
  data: Buffer
  params: SVDParams
}

type SVDRs = SVDF64
type SVDParametersRs = SVDParameters

class SVD extends BaseTransformer<SVDRs, SVDParametersRs> {
  public static readonly className = 'SVD'
  public readonly name: string = SVD.className

  private readonly config: SVDParams

  constructor(params?: SVDParams) {
    const parameters = new SVDParameters()
    const config = params || {}
    if (config.nComponents !== undefined) {
      parameters.withNComponents(config.nComponents)
    }
    super(parameters, config.columns)
    this.config = config
  }

  fitEstimator(matrix: DenseMatrix): SVDF64 {
    return SVDF64.fit(matrix.asF64(), this.parameters)
  }

  transformMatrix(matrix: DenseMatrix): DenseMatrix {
    return new DenseMatrix(this.estimator!.transform(matrix.asF64()))
  }

  protected getComponentColumnName(index: number): string {
    return `PC${index + 1}`
  }

  serialize(): SVDSerializedData {
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
  static deserialize(serializedData: SVDSerializedData): SVD {
    const estimator = SVDF64.deserialize(serializedData.data)
    const instance = new SVD(serializedData.params)
    instance.estimator = estimator
    instance.columns = serializedData.columns
    instance._isFitted = true
    return instance
  }
}

export { SVD }
