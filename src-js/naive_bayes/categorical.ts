import { CategoricalNBBigU64, CategoricalNBParameters } from '../../core-bindings/index.js'
import type { XType, YType } from '../index.js'
import { DenseMatrix } from '../linalg/index.js'
import type { Estimator, Predictor } from '../pipeline/index.js'

type CategoricalNBRs = CategoricalNBBigU64
type CategoricalNBParametersRs = CategoricalNBParameters

interface ICategoricalNBParameters {
  alpha?: number
}

class CategoricalNB implements Estimator<XType, YType, CategoricalNB>, Predictor<XType, BigUint64Array> {
  parameters: CategoricalNBParametersRs
  estimator: CategoricalNBRs | null = null
  public static readonly className = 'CategoricalNB'
  public readonly name: string = CategoricalNB.className

  constructor(params?: ICategoricalNBParameters) {
    this.parameters = new CategoricalNBParameters()
    if (params?.alpha) {
      this.parameters.withAlpha(params.alpha)
    }
  }

  fit(x: XType, y: YType): CategoricalNB {
    let matrix = x instanceof DenseMatrix ? x : DenseMatrix.f64(x)

    if (!y || y.length === 0) {
      throw new Error('Input arrays cannot be empty.')
    }

    if (y instanceof BigUint64Array) {
      this.estimator = CategoricalNBBigU64.fit(matrix.asF64(), y, this.parameters)
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

  static deserialize(data: Buffer): CategoricalNB {
    let instance = new CategoricalNB()
    instance.estimator = CategoricalNBBigU64.deserialize(data)
    return instance
  }
}

export default CategoricalNB
