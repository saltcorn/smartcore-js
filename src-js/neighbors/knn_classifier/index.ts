import { type KNNAlgorithmName, type KNNWeightFunction } from '../../../core-bindings/index.js'
import type { XType, YType } from '../../index.js'
import { DistanceType } from '../../metrics/index.js'
import type { Estimator, Predictor } from '../../pipeline/index.js'
import { KNNClassifierEuclidian } from './euclidian.js'
import { KNNClassifierHamming } from './hamming.js'
import { KNNClassifierMahalanobis } from './mahalanobis.js'
import { KNNClassifierManhattan } from './manhattan.js'
import { KNNClassifierMinkowski } from './minkowski.js'

interface IKNNClassifierParameters {
  k?: number
  algorithm?: KNNAlgorithmName
  weight?: KNNWeightFunction
  distance?: DistanceType
  p?: number
  data?: XType
}

type YTypeKey = 'bigI64' | 'bigU64' | 'i64'

type KNNClassifierDistance =
  | KNNClassifierEuclidian
  | KNNClassifierHamming
  | KNNClassifierMahalanobis
  | KNNClassifierManhattan
  | KNNClassifierMinkowski

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

  deserialize(data: Buffer, yType: YTypeKey): KNNClassifier {
    this.estimator.deserialize(data, yType)
    return this
  }
}

export { KNNClassifier, type IKNNClassifierParameters, type YTypeKey }
