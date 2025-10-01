import { PCAF64, PCAParameters } from '../../core-bindings/index.js'
import type { XType, YType } from '../index.js'
import { DenseMatrix } from '../linalg/index.js'
import type { Estimator, Transformer } from '../pipeline/index.js'

interface PCAParams {
  nComponents?: number
  correlationMatrix?: boolean
}

type PCARs = PCAF64
type PCAParametersRs = PCAParameters

class PCA implements Estimator<XType, YType, PCA>, Transformer<XType> {
  private parameters: PCAParametersRs
  private estimator: PCARs | null = null
  public static readonly className = 'PCA'
  public readonly name: string = PCA.className

  constructor(params?: PCAParams) {
    this.parameters = new PCAParameters()
    if (params) {
      if (params.nComponents !== undefined) {
        this.parameters.withNComponents(params.nComponents)
      }
      if (params.correlationMatrix !== undefined) {
        this.parameters.useCorrelationMatrix(params.correlationMatrix)
      }
    }
  }

  fit(x: XType, y: YType): PCA {
    let matrix = x instanceof DenseMatrix ? x : DenseMatrix.f64(x)

    if (!y || y.length === 0) {
      throw new Error('Input arrays cannot be empty.')
    }

    if (y instanceof Float64Array) {
      this.estimator = PCAF64.fit(matrix.asF64(), this.parameters)
    } else {
      throw new Error('Unsupported data type for input arrays.')
    }

    return this
  }

  transform(x: XType): XType {
    if (this.estimator === null) {
      throw new Error("The 'fit' method should called before the 'predict' method is called.")
    }

    let matrix = x instanceof DenseMatrix ? x : DenseMatrix.f64(x)
    return new DenseMatrix(this.estimator.transform(matrix.asF64()))
  }

  serialize() {
    return this.estimator?.serialize()
  }

  static deserialize(data: Buffer): PCA {
    let estimator = PCAF64.deserialize(data)
    let instance = new PCA()
    instance.estimator = estimator
    return instance
  }
}

export { PCA }
