import {
  KNNRegressorF64EuclidianF64Parameters,
  KNNRegressorF64ManhattanF64Parameters,
  KNNRegressorF64BigI64ManhattanF64,
  KNNRegressorF64BigU64ManhattanF64,
  KNNRegressorF64I64ManhattanF64,
  ManhattanF64,
  KNNRegressorF64F64ManhattanF64,
} from '../../core-bindings/index.js'
import { GenericKNNRegressor } from './generic.js'
import { type IKNNRegressorParameters, type YTypeKey } from './index.js'
import { type XType, type YType } from '../../index.js'

class KNNRegressorManhattan {
  private regressor: GenericKNNRegressor<KNNRegressorF64ManhattanF64Parameters>

  constructor(params?: IKNNRegressorParameters) {
    const p = new KNNRegressorF64EuclidianF64Parameters().withDistanceManhattanF64(new ManhattanF64())
    if (params?.k) p.withK(params.k)
    if (params?.algorithm) p.withAlgorithm(params.algorithm)
    if (params?.weight) p.withWeight(params.weight)

    this.regressor = new GenericKNNRegressor(p, {
      bigI64: KNNRegressorF64BigI64ManhattanF64,
      bigU64: KNNRegressorF64BigU64ManhattanF64,
      i64: KNNRegressorF64I64ManhattanF64,
      f64: KNNRegressorF64F64ManhattanF64,
    })
  }

  fit(x: XType, y: YType) {
    return (this.regressor.fit(x, y), this)
  }

  predict(x: XType): YType {
    return this.regressor.predict(x)
  }

  serialize() {
    return this.regressor.serialize()
  }

  deserialize(data: Buffer, key: YTypeKey) {
    this.deserialize(data, key)
  }
}

export { KNNRegressorManhattan }
