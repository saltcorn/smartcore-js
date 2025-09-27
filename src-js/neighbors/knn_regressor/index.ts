import { type KNNAlgorithmName, type KNNWeightFunction } from '../../../core-bindings/index.js'
import type { XType, YType } from '../../index.js'
import type { Estimator, Predictor } from '../../pipeline/index.js'
import { KNNRegressorEuclidian } from './euclidian.js'
import { KNNRegressorHamming } from './hamming.js'
import { KNNRegressorMahalanobis } from './mahalanobis.js'
import { KNNRegressorManhattan } from './manhattan.js'
import { KNNRegressorMinkowski } from './minkowski.js'

enum DistanceType {
  EUCLIDIAN,
  HAMMING,
  MANHATTAN,
  MAHALANOBIS,
  MINKOWSKI,
}

interface IKNNRegressorParameters {
  k?: number
  algorithm?: KNNAlgorithmName
  weight?: KNNWeightFunction
  distance?: DistanceType
  p?: number
  data?: XType
}

type KNNRegressorDistance =
  | KNNRegressorEuclidian
  | KNNRegressorHamming
  | KNNRegressorMahalanobis
  | KNNRegressorManhattan
  | KNNRegressorMinkowski

enum EstimatorType {
  F64F64,
  F64I64,
  F64BigI64,
  F64BigU64,
}

class KNNRegressor implements Estimator<XType, YType, KNNRegressor>, Predictor<XType, YType> {
  private estimator: KNNRegressorDistance

  constructor(params?: IKNNRegressorParameters) {
    switch (params?.distance) {
      case undefined:
      case DistanceType.EUCLIDIAN:
        this.estimator = new KNNRegressorEuclidian(params)
        break
      case DistanceType.HAMMING:
        this.estimator = new KNNRegressorHamming(params)
        break
      case DistanceType.MAHALANOBIS:
        this.estimator = new KNNRegressorMahalanobis(params)
        break
      case DistanceType.MANHATTAN:
        this.estimator = new KNNRegressorManhattan(params)
        break
      case DistanceType.MINKOWSKI:
        this.estimator = new KNNRegressorMinkowski(params)
        break
      default:
        throw new Error('Unrecognized distance type')
    }
  }

  fit(x: XType, y: YType): KNNRegressor {
    this.estimator.fit(x, y)
    return this
  }

  predict(x: XType): YType {
    return this.estimator.predict(x)
  }

  serialize() {
    return this.estimator?.serialize()
  }

  static deserialize(data: Buffer, estimatorType: EstimatorType, distanceType: DistanceType): KNNRegressor {
    let instance = new KNNRegressor()
    switch (distanceType) {
      case DistanceType.EUCLIDIAN:
        instance.estimator = KNNRegressorEuclidian.deserialize(data, estimatorType)
        break
      case DistanceType.HAMMING:
        instance.estimator = KNNRegressorHamming.deserialize(data, estimatorType)
        break
      case DistanceType.MAHALANOBIS:
        instance.estimator = KNNRegressorMahalanobis.deserialize(data, estimatorType)
        break
      case DistanceType.MANHATTAN:
        instance.estimator = KNNRegressorManhattan.deserialize(data, estimatorType)
        break
      case DistanceType.MINKOWSKI:
        instance.estimator = KNNRegressorMinkowski.deserialize(data, estimatorType)
        break
    }
    return instance
  }
}

export { KNNRegressor, type IKNNRegressorParameters, EstimatorType }
