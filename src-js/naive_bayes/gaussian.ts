import { GaussianNBF64BigU64, GaussianNBParameters } from '../../core-bindings/index.js'
import type { XType, YType } from '../index.js'
import { DenseMatrix } from '../linalg/index.js'
import type { Estimator, Predictor } from '../pipeline/index.js'

type GaussianNBRs = GaussianNBF64BigU64
type GaussianNBParametersRs = GaussianNBParameters

interface IGaussianNBParameters {
  priors?: Float64Array
}

class GaussianNB implements Estimator<XType, YType, GaussianNB>, Predictor<XType, BigUint64Array> {
  parameters: GaussianNBParametersRs
  estimator: GaussianNBRs | null = null

  constructor(params?: IGaussianNBParameters) {
    this.parameters = new GaussianNBParameters()
    if (params?.priors) {
      this.parameters.withPriors(params.priors)
    }
  }

  fit(x: XType, y: YType): GaussianNB {
    let matrix = x instanceof DenseMatrix ? x : DenseMatrix.f64(x)

    if (!y || y.length === 0) {
      throw new Error('Input arrays cannot be empty.')
    }

    if (y instanceof BigUint64Array) {
      this.estimator = GaussianNBF64BigU64.fit(matrix.asF64(), y, this.parameters)
    } else {
      throw new Error('Unsupported data type!')
    }

    return this
  }

  predict(x: XType): BigUint64Array {
    if (this.estimator === null) {
      throw new Error("The 'fit' method should called before the 'predict' method is called.")
    }

    let matrix = x instanceof DenseMatrix ? x : DenseMatrix.f64(x)

    return this.estimator.predict(matrix.asF64())
  }

  serialize() {
    return this.estimator?.serialize()
  }

  static deserialize(data: Buffer): GaussianNB {
    let instance = new GaussianNB()
    instance.estimator = GaussianNBF64BigU64.deserialize(data)
    return instance
  }
}

export default GaussianNB
