import { SVDF64, SVDParameters } from '../../core-bindings/index.js'
import type { XType, YType } from '../index.js'
import { DenseMatrix } from '../linalg/index.js'
import type { Estimator, Transformer } from '../pipeline/index.js'

interface SVDParams {
  nComponents?: number
}

type SVDRs = SVDF64
type SVDParametersRs = SVDParameters

class SVD implements Estimator<XType, YType, SVD>, Transformer<XType> {
  private parameters: SVDParametersRs
  private estimator: SVDRs | null = null

  constructor(params?: SVDParams) {
    this.parameters = new SVDParameters()
    if (params) {
      if (params.nComponents !== undefined) {
        this.parameters.withNComponents(params.nComponents)
      }
    }
  }

  fit(x: XType, y: YType): SVD {
    let matrix = x instanceof DenseMatrix ? x : DenseMatrix.f64(x)

    if (!y || y.length === 0) {
      throw new Error('Input arrays cannot be empty.')
    }

    if (y instanceof Float64Array) {
      this.estimator = SVDF64.fit(matrix.asF64(), this.parameters)
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

  static deserialize(data: Buffer): SVD {
    let estimator = SVDF64.deserialize(data)
    let instance = new SVD()
    instance.estimator = estimator
    return instance
  }
}

export { SVD }
