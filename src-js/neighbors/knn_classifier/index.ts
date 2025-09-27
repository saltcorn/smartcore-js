import { type KNNAlgorithmName, type KNNWeightFunction } from '../../../core-bindings/index.js'
import type { XType, YType } from '../../index.js'
import type { Estimator, Predictor } from '../../pipeline/index.js'
import { KNNClassifierEuclidian } from './euclidian.js'
import { KNNClassifierHamming } from './hamming.js'
import { KNNClassifierMahalanobis } from './mahalanobis.js'
import { KNNClassifierManhattan } from './manhattan.js'
import { KNNClassifierMinkowski } from './minkowski.js'

enum DistanceType {
  EUCLIDIAN,
  HAMMING,
  MANHATTAN,
  MAHALANOBIS,
  MINKOWSKI,
}

interface IKNNClassifierParameters {
  k?: number
  algorithm?: KNNAlgorithmName
  weight?: KNNWeightFunction
  distance?: DistanceType
  p?: number
  data?: XType
}

type KNNClassifierDistance =
  | KNNClassifierEuclidian
  | KNNClassifierHamming
  | KNNClassifierMahalanobis
  | KNNClassifierManhattan
  | KNNClassifierMinkowski

enum EstimatorType {
  F64I64,
  F64BigI64,
  F64BigU64,
}

class KNNClassifier implements Estimator<XType, YType, KNNClassifier>, Predictor<XType, YType> {
  private estimator: KNNClassifierDistance

  constructor(params?: IKNNClassifierParameters) {
    switch (params?.distance) {
      case undefined:
      case DistanceType.EUCLIDIAN:
        this.estimator = new KNNClassifierEuclidian(params)
        break
      case DistanceType.HAMMING:
        this.estimator = new KNNClassifierHamming(params)
        break
      case DistanceType.MAHALANOBIS:
        this.estimator = new KNNClassifierMahalanobis(params)
        break
      case DistanceType.MANHATTAN:
        this.estimator = new KNNClassifierManhattan(params)
        break
      case DistanceType.MINKOWSKI:
        this.estimator = new KNNClassifierMinkowski(params)
        break
      default:
        throw new Error('Unrecognized distance type')
    }
  }

  fit(x: XType, y: YType): KNNClassifier {
    this.estimator.fit(x, y)
    return this
  }

  predict(x: XType): YType {
    return this.estimator.predict(x)
  }

  serialize() {
    return this.estimator?.serialize()
  }

  static deserialize(data: Buffer, estimatorType: EstimatorType, distanceType: DistanceType): KNNClassifier {
    let instance = new KNNClassifier()
    switch (distanceType) {
      case DistanceType.EUCLIDIAN:
        instance.estimator = KNNClassifierEuclidian.deserialize(data, estimatorType)
        break
      case DistanceType.HAMMING:
        instance.estimator = KNNClassifierHamming.deserialize(data, estimatorType)
        break
      case DistanceType.MAHALANOBIS:
        instance.estimator = KNNClassifierMahalanobis.deserialize(data, estimatorType)
        break
      case DistanceType.MANHATTAN:
        instance.estimator = KNNClassifierManhattan.deserialize(data, estimatorType)
        break
      case DistanceType.MINKOWSKI:
        instance.estimator = KNNClassifierMinkowski.deserialize(data, estimatorType)
        break
    }
    return instance
  }
}

export { KNNClassifier, type IKNNClassifierParameters, EstimatorType }
