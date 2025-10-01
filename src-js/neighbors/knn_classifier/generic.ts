import { type YType, type XType } from '../../index.js'
import { DenseMatrix } from '../../linalg/index.js'
import { type YTypeKey } from './index.js'

interface EstimatorClass {
  fit(matrix: any, y: any, params: any): any
  deserialize(data: Buffer): any
}

function getEstimatorKey(y: YType): YTypeKey {
  if (y instanceof BigInt64Array) return 'bigI64'
  if (y instanceof BigUint64Array) return 'bigU64'
  if (Array.isArray(y) && !(y instanceof Float32Array)) return 'i64'
  throw new Error('Unsupported data type')
}

class GenericKNNClassifier<TParams> {
  private estimator: any = null
  private estimatorKey: YTypeKey | null = null
  private estimatorClasses: Record<YTypeKey, EstimatorClass>

  constructor(
    private params: TParams,
    estimatorClasses: Record<YTypeKey, EstimatorClass>,
  ) {
    this.estimatorClasses = estimatorClasses
  }

  setEstimator(estimator: EstimatorClass) {
    if (this.estimator !== null) {
      throw new Error('Estimator already set.')
    }
    this.estimator = estimator
  }

  fit(x: XType, y: YType): this {
    const matrix = x instanceof DenseMatrix ? x : DenseMatrix.f64(x)

    if (!y || y.length === 0) {
      throw new Error('Input arrays cannot be empty.')
    }

    const key = getEstimatorKey(y)
    const EstimatorClass = this.estimatorClasses[key]

    this.setEstimator(EstimatorClass.fit(matrix.asF64(), y, this.params))
    this.estimatorKey = key

    return this
  }

  predict(x: XType): YType {
    if (this.estimator === null) {
      throw new Error("The 'fit' method should be called before the 'predict' method is called.")
    }

    const matrix = x instanceof DenseMatrix ? x : DenseMatrix.f64(x)
    return this.estimator.predict(matrix.asF64())
  }

  /*
   *Returns { params, estimatorKey, model }
   *    To deserialize: Use params to construct an 'unfit' instance then call deserialize(data: model, estimatorKey) on it
   */
  serialize() {
    if (this.estimator === null) {
      throw new Error("The 'fit' method should be called before the 'serialize' method is called.")
    }
    return {
      params: this.params,
      estimatorKey: this.estimatorKey,
      model: this.estimator.serialize(),
    }
  }

  deserialize(data: Buffer, estimatorKey: YTypeKey) {
    const EstimatorClass = this.estimatorClasses[estimatorKey]
    this.setEstimator(EstimatorClass.deserialize(data))
  }
}

export { GenericKNNClassifier, type EstimatorClass }
