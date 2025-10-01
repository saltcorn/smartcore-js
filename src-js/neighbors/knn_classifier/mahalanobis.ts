import {
  KNNClassifierF64EuclidianF64Parameters,
  KNNClassifierF64MahalanobisF64Parameters,
  KNNClassifierF64BigI64MahalanobisF64,
  KNNClassifierF64BigU64MahalanobisF64,
  KNNClassifierF64I64MahalanobisF64,
  MahalanobisF64,
} from '../../../core-bindings/index.js'
import { GenericKNNClassifier } from './generic.js'
import { type IKNNClassifierParameters, type YTypeKey } from './index.js'
import { DenseMatrix, type XType, type YType } from '../../index.js'

class KNNClassifierMahalanobis {
  private classifier: GenericKNNClassifier<KNNClassifierF64MahalanobisF64Parameters>

  constructor(params?: IKNNClassifierParameters) {
    if (!params?.data) {
      throw new Error("Mahalanobis requires 'data' to be defined!")
    }
    let data = params.data instanceof DenseMatrix ? params.data : new DenseMatrix(params.data)
    const p = new KNNClassifierF64EuclidianF64Parameters().withDistanceMahalanobisF64(new MahalanobisF64(data.asF64()))
    if (params?.k) p.withK(params.k)
    if (params?.algorithm) p.withAlgorithm(params.algorithm)
    if (params?.weight) p.withWeight(params.weight)

    this.classifier = new GenericKNNClassifier(p, {
      bigI64: KNNClassifierF64BigI64MahalanobisF64,
      bigU64: KNNClassifierF64BigU64MahalanobisF64,
      i64: KNNClassifierF64I64MahalanobisF64,
    })
  }

  fit(x: XType, y: YType) {
    return (this.classifier.fit(x, y), this)
  }

  predict(x: XType): YType {
    return this.classifier.predict(x)
  }

  serialize() {
    return this.classifier.serialize()
  }

  deserialize(data: Buffer, key: YTypeKey) {
    this.deserialize(data, key)
  }
}

export { KNNClassifierMahalanobis }
