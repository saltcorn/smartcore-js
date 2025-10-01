import { LassoF64I64, LassoParameters, LassoF64F64, LassoF64BigI64, LassoF64BigU64 } from '../../core-bindings/index.js'
import type { XType, YType } from '../index.js'
import { DenseMatrix } from '../linalg/index.js'
import type { Estimator, Predictor } from '../pipeline/index.js'

type LassoRs = LassoF64I64 | LassoF64F64 | LassoF64BigI64 | LassoF64BigU64

interface ILassoParameters {
  alpha?: number
  normalize?: boolean
  tol?: number
  maxIter?: number
}

enum EstimatorType {
  F64BigI64,
  F64BigU64,
  F64I64,
  F64F64,
}

class Lasso implements Estimator<XType, YType, Lasso>, Predictor<XType, YType> {
  parameters: LassoParameters
  estimator: LassoRs | null = null
  public static readonly className = 'Lasso'
  public readonly name: string = Lasso.className

  constructor(params?: ILassoParameters) {
    this.parameters = new LassoParameters()
    if (params?.alpha) {
      this.parameters.withAlpha(params.alpha)
    }
    if (params?.normalize) {
      this.parameters.withNormalize(params.normalize)
    }
    if (params?.tol) {
      this.parameters.withTol(params.tol)
    }
    if (params?.maxIter) {
      this.parameters.withMaxIter(params.maxIter)
    }
  }

  fit(x: XType, y: YType): Lasso {
    let matrix = x instanceof DenseMatrix ? x : DenseMatrix.f64(x)

    if (!y || y.length === 0) {
      throw new Error('Input arrays cannot be empty.')
    }

    if (y instanceof Float64Array) {
      this.estimator = LassoF64F64.fit(matrix.asF64(), y, this.parameters)
    } else if (y instanceof BigInt64Array) {
      this.estimator = LassoF64BigI64.fit(matrix.asF64(), y, this.parameters)
    } else if (y instanceof BigUint64Array) {
      this.estimator = LassoF64BigU64.fit(matrix.asF64(), y, this.parameters)
    } else if (y.every((val) => Number.isInteger(val))) {
      this.estimator = LassoF64I64.fit(matrix.asF64(), y, this.parameters)
    } else {
      throw new Error('Unsupported data type!')
    }

    return this
  }

  predict(x: XType): YType {
    if (this.estimator === null) {
      throw new Error("The 'fit' method should called before the 'predict' method is called.")
    }

    let matrix = x instanceof DenseMatrix ? x : DenseMatrix.f64(x)

    return this.estimator.predict(matrix.asF64())
  }

  serialize() {
    return this.estimator?.serialize()
  }

  static deserialize(data: Buffer, estimatorType: EstimatorType): Lasso {
    let instance = new Lasso()
    switch (estimatorType) {
      case EstimatorType.F64BigI64:
        instance.estimator = LassoF64BigI64.deserialize(data)
        break
      case EstimatorType.F64BigU64:
        instance.estimator = LassoF64BigU64.deserialize(data)
        break
      case EstimatorType.F64F64:
        instance.estimator = LassoF64F64.deserialize(data)
        break
      case EstimatorType.F64I64:
        instance.estimator = LassoF64I64.deserialize(data)
        break
      default:
        throw new Error(`Unrecognized estimator type: '${estimatorType}'`)
    }
    return instance
  }
}

export default Lasso
