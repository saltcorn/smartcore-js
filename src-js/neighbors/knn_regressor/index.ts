import { type KNNAlgorithmName, type KNNWeightFunction } from '../../../core-bindings/index.js'
import type { XType, YType } from '../../index.js'
import { DistanceType } from '../../metrics/index.js'
import type { Estimator, Predictor } from '../../pipeline/index.js'
import { KNNRegressorEuclidian } from './euclidian.js'
import { KNNRegressorHamming } from './hamming.js'
import { KNNRegressorMahalanobis } from './mahalanobis.js'
import { KNNRegressorManhattan } from './manhattan.js'
import { KNNRegressorMinkowski } from './minkowski.js'

interface IKNNRegressorParameters {
  k?: number
  algorithm?: KNNAlgorithmName
  weight?: KNNWeightFunction
  distance?: DistanceType
  p?: number
  data?: XType
}

type YTypeKey = 'bigI64' | 'bigU64' | 'i64' | 'f64'

type KNNRegressorDistance =
  | KNNRegressorEuclidian
  | KNNRegressorHamming
  | KNNRegressorMahalanobis
  | KNNRegressorManhattan
  | KNNRegressorMinkowski

class KNNRegressor implements Estimator<XType, YType, KNNRegressor>, Predictor<XType, YType> {
  private estimator: KNNRegressorDistance
  public static readonly className = 'KNNRegressor'
  public readonly name: string

  constructor(params?: IKNNRegressorParameters) {
    this.name = KNNRegressor.className
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

  deserialize(data: Buffer, yType: YTypeKey): KNNRegressor {
    this.estimator.deserialize(data, yType)
    return this
  }
}

export { KNNRegressor, type IKNNRegressorParameters, type YTypeKey }
