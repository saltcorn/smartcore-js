import { KMeansF64BigI64, KMeansF64I64, KMeansParameters, KMeansF64F64 } from '../../core-bindings/index.js'
import type { XType, YType } from '../index.js'
import { DenseMatrix } from '../linalg/index.js'
import type { Estimator, Predictor } from '../pipeline/index.js'

interface KMeansParams {
  maxIter?: number
  k?: number
}

type KMeansRs = KMeansF64I64 | KMeansF64BigI64 | KMeansF64F64
enum EstimatorType {
  F64I64,
  F64BigI64,
  F64F64,
}

class KMeans implements Estimator<XType, YType, KMeans>, Predictor<XType, YType> {
  private parameters: KMeansParameters
  private estimator: KMeansRs | null = null
  public static readonly className = 'KMeans'
  public readonly name: string = KMeans.className

  constructor(params?: KMeansParams) {
    this.parameters = new KMeansParameters()
    if (params) {
      if (params.maxIter !== undefined) {
        this.parameters.withMaxIter(params.maxIter)
      }
      if (params.k !== undefined) {
        this.parameters.withK(params.k)
      }
    }
  }

  fit(x: XType, y: YType): KMeans {
    let matrix = x instanceof DenseMatrix ? x : DenseMatrix.f64(x)

    if (!y || y.length === 0) {
      throw new Error('Input arrays cannot be empty.')
    }

    if (y instanceof Float64Array) {
      this.estimator = KMeansF64F64.fit(matrix.asF64(), this.parameters)
    } else if (y instanceof BigInt64Array) {
      this.estimator = KMeansF64BigI64.fit(matrix.asF64(), this.parameters)
    } else if (y.every((val) => Number.isInteger(val))) {
      this.estimator = KMeansF64I64.fit(matrix.asF64(), this.parameters)
    } else {
      throw new Error('Unsupported data type for input arrays.')
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

  static deserialize(data: Buffer, estimatorType: EstimatorType): KMeans {
    let instance = new KMeans()
    switch (estimatorType) {
      case EstimatorType.F64BigI64:
        instance.estimator = KMeansF64BigI64.deserialize(data)
        break
      case EstimatorType.F64I64:
        instance.estimator = KMeansF64I64.deserialize(data)
        break
      case EstimatorType.F64F64:
        instance.estimator = KMeansF64F64.deserialize(data)
        break
      default:
        throw new Error(`Unrecognized estimator type: '${estimatorType}'`)
    }
    return instance
  }
}

export { KMeans }
