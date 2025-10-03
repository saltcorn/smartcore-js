import { MultinomialNBU64BigU64, MultinomialNBParameters } from '../../core-bindings/index.js'
import type { XType, YType } from '../index.js'
import { DenseMatrix } from '../linalg/index.js'
import type { Estimator, Predictor } from '../pipeline/index.js'

type MultinomialNBRs = MultinomialNBU64BigU64
type MultinomialNBParametersRs = MultinomialNBParameters

interface IMultinomialNBParameters {
  priors?: Float64Array
  alpha?: number
}

class MultinomialNB implements Estimator<XType, YType, MultinomialNB>, Predictor<XType, BigUint64Array> {
  parameters: MultinomialNBParametersRs
  estimator: MultinomialNBRs | null = null
  public static readonly className = 'MultinomialNB'
  public readonly name: string = MultinomialNB.className

  constructor(params?: IMultinomialNBParameters) {
    this.parameters = new MultinomialNBParameters()
    if (params?.priors) {
      this.parameters.withPriors(params.priors)
    }
    if (params?.alpha) {
      this.parameters.withAlpha(params.alpha)
    }
  }

  fit(x: XType, y: YType): MultinomialNB {
    let matrix = x instanceof DenseMatrix ? x : DenseMatrix.f64(x)

    if (!y || y.length === 0) {
      throw new Error('Input arrays cannot be empty.')
    }

    if (y instanceof BigUint64Array) {
      this.estimator = MultinomialNBU64BigU64.fit(matrix.asU64(), y, this.parameters)
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

    return this.estimator.predict(matrix.asU64())
  }

  serialize() {
    return this.estimator?.serialize()
  }

  static deserialize(data: Buffer): MultinomialNB {
    let instance = new MultinomialNB()
    instance.estimator = MultinomialNBU64BigU64.deserialize(data)
    return instance
  }
}

export default MultinomialNB
