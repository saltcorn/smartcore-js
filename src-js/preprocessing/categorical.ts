import { OneHotEncoderF64, OneHotEncoderParameters } from '../core-bindings/index.js'
import { DenseMatrix } from '../linalg/index.js'
import { BaseTransformer } from '../base_transformer.js'

type OneHotEncoderRs = OneHotEncoderF64
type OneHotEncoderParametersRs = OneHotEncoderParameters

interface IOneHotEncoderParameters {
  categoricalParams: BigUint64Array
  columns?: string[]
}

interface OneHotEncoderSerializedData {
  columns: string[] | null
  data: Buffer
  params: IOneHotEncoderParameters
}

class OneHotEncoder extends BaseTransformer<OneHotEncoderRs, OneHotEncoderParametersRs> {
  public static readonly className = 'OneHotEncoder'
  public readonly name: string = OneHotEncoder.className

  constructor(params: IOneHotEncoderParameters) {
    const parameters = new OneHotEncoderParameters(params.categoricalParams)
    super(parameters, params.columns)
  }

  protected fitEstimator(matrix: DenseMatrix): OneHotEncoderF64 {
    return new OneHotEncoderF64(matrix.asF64(), this.parameters)
  }

  protected transformMatrix(matrix: DenseMatrix): DenseMatrix {
    return new DenseMatrix(this.estimator!.transform(matrix.asF64()))
  }

  protected getComponentColumnName(index: number): string {
    return `OHE${index + 1}`
  }

  serialize(): OneHotEncoderSerializedData {
    this.ensureFitted('serialize')

    throw new Error(`${this.name}: Unimplemented!`)
  }
}

export default OneHotEncoder
