import {
  KNNRegressorF64F64EuclidianF64,
  KNNRegressorF64I64EuclidianF64,
  KNNRegressorF64BigI64EuclidianF64,
  KNNRegressorF64BigU64EuclidianF64,
  KNNRegressorF64EuclidianF64Parameters,
} from '../../../core-bindings/index.js'
import type { XType, YType } from '../../index.js'
import { DenseMatrix } from '../../linalg/index.js'
import type { Estimator, Predictor } from '../../pipeline/index.js'
import { type IKNNRegressorParameters, EstimatorType } from './index.js'

type KNNRegressorRs =
  | KNNRegressorF64I64EuclidianF64
  | KNNRegressorF64BigI64EuclidianF64
  | KNNRegressorF64BigU64EuclidianF64
  | KNNRegressorF64F64EuclidianF64

abstract class KNNRegressorStatics {
  private parameters = new KNNRegressorF64EuclidianF64Parameters()

  constructor() {}

  get params(): KNNRegressorF64EuclidianF64Parameters {
    return this.parameters
  }

  initializeParameterValues(parameters?: IKNNRegressorParameters) {
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

class KNNRegressorEuclidian
  extends KNNRegressorStatics
  implements Estimator<XType, YType, KNNRegressorEuclidian>, Predictor<XType, YType>
{
  private estimator: KNNRegressorRs | null = null

  constructor(params?: IKNNRegressorParameters) {
    super()
    this.initializeParameterValues(params)
  }

  fit(x: XType, y: YType): KNNRegressorEuclidian {
    let matrix = x instanceof DenseMatrix ? x : DenseMatrix.f64(x)

    if (!y || y.length === 0) {
      throw new Error('Input arrays cannot be empty.')
    }

    if (y instanceof BigInt64Array) {
      this.estimator = KNNRegressorF64BigI64EuclidianF64.fit(matrix.asF64(), y, this.params)
    } else if (y instanceof BigUint64Array) {
      this.estimator = KNNRegressorF64BigU64EuclidianF64.fit(matrix.asF64(), y, this.params)
    } else if (y instanceof Float64Array) {
      this.estimator = KNNRegressorF64F64EuclidianF64.fit(matrix.asF64(), y, this.params)
    } else if (y instanceof Array) {
      this.estimator = KNNRegressorF64I64EuclidianF64.fit(matrix.asF64(), y, this.params)
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

  static deserialize(data: Buffer, estimatorType: EstimatorType): KNNRegressorEuclidian {
    let instance = new KNNRegressorEuclidian()
    switch (estimatorType) {
      case EstimatorType.F64F64:
        instance.estimator = KNNRegressorF64F64EuclidianF64.deserialize(data)
        break
      case EstimatorType.F64BigI64:
        instance.estimator = KNNRegressorF64BigI64EuclidianF64.deserialize(data)
        break
      case EstimatorType.F64BigU64:
        instance.estimator = KNNRegressorF64BigU64EuclidianF64.deserialize(data)
        break
      case EstimatorType.F64I64:
        instance.estimator = KNNRegressorF64I64EuclidianF64.deserialize(data)
        break
      default:
        throw new Error(`Unrecognized estimator type: '${estimatorType}'`)
    }
    return instance
  }
}

export { KNNRegressorEuclidian }
