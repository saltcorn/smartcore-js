import {
  KNNClassifierF64EuclidianF64Parameters,
  KNNClassifierF64I64MahalanobisF64,
  KNNClassifierF64BigI64MahalanobisF64,
  KNNClassifierF64BigU64MahalanobisF64,
  KNNClassifierF64MahalanobisF64Parameters,
  MahalanobisF64,
} from '../../../core-bindings/index.js'
import type { XType, YType } from '../../index.js'
import { DenseMatrix } from '../../linalg/index.js'
import type { Estimator, Predictor } from '../../pipeline/index.js'
import { type IKNNClassifierParameters, EstimatorType } from './index.js'

type KNNClassifierRs =
  | KNNClassifierF64I64MahalanobisF64
  | KNNClassifierF64BigI64MahalanobisF64
  | KNNClassifierF64BigU64MahalanobisF64

abstract class KNNClassifierStatics {
  private parameters

  constructor(parameters?: IKNNClassifierParameters) {
    if (parameters?.data === undefined) {
      throw new Error("Mahalanobis requires 'data' to be defined")
    }
    let matrix = parameters.data instanceof DenseMatrix ? parameters.data : DenseMatrix.f64(parameters.data)
    this.parameters = new KNNClassifierF64EuclidianF64Parameters().withDistanceMahalanobisF64(
      new MahalanobisF64(matrix.asF64()),
    )
  }

  get params(): KNNClassifierF64MahalanobisF64Parameters {
    return this.parameters
  }

  initializeParameterValues(parameters?: IKNNClassifierParameters) {
    if (parameters?.k) {
      this.parameters.withK(parameters.k)
    }
    if (parameters?.algorithm) {
      this.parameters.withAlgorithm(parameters.algorithm)
    }
    if (parameters?.weight) {
      this.parameters.withWeight(parameters.weight)
    }
  }
}

class KNNClassifierMahalanobis
  extends KNNClassifierStatics
  implements Estimator<XType, YType, KNNClassifierMahalanobis>, Predictor<XType, YType>
{
  private estimator: KNNClassifierRs | null = null

  constructor(params?: IKNNClassifierParameters) {
    super()
    this.initializeParameterValues(params)
  }

  fit(x: XType, y: YType): KNNClassifierMahalanobis {
    let matrix = x instanceof DenseMatrix ? x : DenseMatrix.f64(x)

    if (!y || y.length === 0) {
      throw new Error('Input arrays cannot be empty.')
    }

    if (y instanceof BigInt64Array) {
      this.estimator = KNNClassifierF64BigI64MahalanobisF64.fit(matrix.asF64(), y, this.params)
    } else if (y instanceof BigUint64Array) {
      this.estimator = KNNClassifierF64BigU64MahalanobisF64.fit(matrix.asF64(), y, this.params)
    } else if (!(y instanceof Float64Array)) {
      this.estimator = KNNClassifierF64I64MahalanobisF64.fit(matrix.asF64(), y, this.params)
    } else {
      throw new Error('Unsupported data type')
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

  static deserialize(data: Buffer, estimatorType: EstimatorType): KNNClassifierMahalanobis {
    let instance = new KNNClassifierMahalanobis()
    switch (estimatorType) {
      case EstimatorType.F64BigI64:
        instance.estimator = KNNClassifierF64BigI64MahalanobisF64.deserialize(data)
        break
      case EstimatorType.F64BigU64:
        instance.estimator = KNNClassifierF64BigU64MahalanobisF64.deserialize(data)
        break
      case EstimatorType.F64I64:
        instance.estimator = KNNClassifierF64I64MahalanobisF64.deserialize(data)
        break
      default:
        throw new Error(`Unrecognized estimator type: '${estimatorType}'`)
    }
    return instance
  }
}

export { KNNClassifierMahalanobis }
