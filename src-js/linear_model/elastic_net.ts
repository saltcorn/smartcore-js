import {
  ElasticNetF64I64,
  ElasticNetParameters,
  ElasticNetF64F64,
  ElasticNetF64BigI64,
  ElasticNetF64BigU64,
} from '../../core-bindings/index.js'
import type { XType, YType } from '../index.js'
import { DenseMatrix } from '../linalg/index.js'
import type { Estimator, Predictor } from '../pipeline/index.js'

type ElasticNetRs = ElasticNetF64I64 | ElasticNetF64F64 | ElasticNetF64BigI64 | ElasticNetF64BigU64

interface IElasticNetParameters {
  alpha?: number
  normalize?: boolean
  tol?: number
  maxIter?: number
  l1Ratio?: number
}

enum EstimatorType {
  F64BigU64,
  F64BigI64,
  F64I64,
  F64F64,
}

class ElasticNet implements Estimator<XType, YType, ElasticNet>, Predictor<XType, YType> {
  parameters: ElasticNetParameters
  estimator: ElasticNetRs | null = null

  constructor(params?: IElasticNetParameters) {
    this.parameters = new ElasticNetParameters()
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
    if (params?.l1Ratio) {
      this.parameters.withL1Ratio(params.l1Ratio)
    }
  }

  fit(x: XType, y: YType): ElasticNet {
    let matrix = x instanceof DenseMatrix ? x : DenseMatrix.f64(x)

    if (!y || y.length === 0) {
      throw new Error('Input arrays cannot be empty.')
    }

    if (y instanceof Float64Array) {
      this.estimator = ElasticNetF64F64.fit(matrix.asF64(), y, this.parameters)
    } else if (y instanceof BigInt64Array) {
      this.estimator = ElasticNetF64BigI64.fit(matrix.asF64(), y, this.parameters)
    } else if (y instanceof BigUint64Array) {
      this.estimator = ElasticNetF64BigU64.fit(matrix.asF64(), y, this.parameters)
    } else if (y.every((val) => Number.isInteger(val))) {
      this.estimator = ElasticNetF64I64.fit(matrix.asF64(), y, this.parameters)
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

  static deserialize(data: Buffer, estimatorType: EstimatorType): ElasticNet {
    let instance = new ElasticNet()
    switch (estimatorType) {
      case EstimatorType.F64BigI64:
        instance.estimator = ElasticNetF64BigI64.deserialize(data)
        break
      case EstimatorType.F64BigU64:
        instance.estimator = ElasticNetF64BigU64.deserialize(data)
        break
      case EstimatorType.F64F64:
        instance.estimator = ElasticNetF64F64.deserialize(data)
        break
      case EstimatorType.F64I64:
        instance.estimator = ElasticNetF64I64.deserialize(data)
        break
      default:
        throw new Error(`Unrecognized estimator type: '${estimatorType}'`)
    }
    return instance
  }
}

export default ElasticNet
