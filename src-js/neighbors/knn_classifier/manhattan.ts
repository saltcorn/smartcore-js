import {
  KNNClassifierF64EuclidianF64Parameters,
  KNNClassifierF64ManhattanF64Parameters,
  KNNClassifierF64BigI64ManhattanF64,
  KNNClassifierF64BigU64ManhattanF64,
  KNNClassifierF64I64ManhattanF64,
  ManhattanF64,
} from '../../core-bindings/index.js'
import { GenericKNNClassifier } from './generic.js'
import { type IKNNClassifierParameters, type YTypeKey } from './index.js'
import { type XType, type YType } from '../../index.js'

class KNNClassifierManhattan {
  private classifier: GenericKNNClassifier<KNNClassifierF64ManhattanF64Parameters>

  constructor(params?: IKNNClassifierParameters) {
    const p = new KNNClassifierF64EuclidianF64Parameters().withDistanceManhattanF64(new ManhattanF64())
    if (params?.k) p.withK(params.k)
    if (params?.algorithm) p.withAlgorithm(params.algorithm)
    if (params?.weight) p.withWeight(params.weight)

    this.classifier = new GenericKNNClassifier(p, {
      bigI64: KNNClassifierF64BigI64ManhattanF64,
      bigU64: KNNClassifierF64BigU64ManhattanF64,
      i64: KNNClassifierF64I64ManhattanF64,
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

export { KNNClassifierManhattan }
