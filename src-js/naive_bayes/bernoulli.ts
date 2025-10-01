import { BernoulliNBF64BigU64, BernoulliNBF64Parameters } from '../../core-bindings/index.js'
import type { XType, YType } from '../index.js'
import { DenseMatrix } from '../linalg/index.js'
import type { Estimator, Predictor } from '../pipeline/index.js'

type BernoulliNBRs = BernoulliNBF64BigU64
type BernoulliNBParameters = BernoulliNBF64Parameters

interface IBernoulliNBParameters {
  priors?: Float64Array
  alpha?: number
  binarize?: number
}

class BernoulliNB implements Estimator<XType, YType, BernoulliNB>, Predictor<XType, BigUint64Array> {
  parameters: BernoulliNBParameters
  estimator: BernoulliNBRs | null = null
  public static readonly className = 'BernoulliNB'
  public readonly name: string = BernoulliNB.className

  constructor(params?: IBernoulliNBParameters) {
    this.parameters = new BernoulliNBF64Parameters()
    if (params?.alpha) {
      this.parameters.withAlpha(params.alpha)
    }
    if (params?.priors) {
      this.parameters.withPriors(params.priors)
    }
    if (params?.binarize) {
      this.parameters.withBinarize(params.binarize)
    }
  }

  fit(x: XType, y: YType): BernoulliNB {
    let matrix = x instanceof DenseMatrix ? x : DenseMatrix.f64(x)

    if (!y || y.length === 0) {
      throw new Error('Input arrays cannot be empty.')
    }

    if (y instanceof BigUint64Array) {
      this.estimator = BernoulliNBF64BigU64.fit(matrix.asF64(), y, this.parameters)
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

  static deserialize(data: Buffer): BernoulliNB {
    let instance = new BernoulliNB()
    instance.estimator = BernoulliNBF64BigU64.deserialize(data)
    return instance
  }
}

export default BernoulliNB
