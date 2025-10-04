import {
  KNNRegressorF64EuclidianF64Parameters,
  KNNRegressorF64MinkowskiF64Parameters,
  KNNRegressorF64BigI64MinkowskiF64,
  KNNRegressorF64BigU64MinkowskiF64,
  KNNRegressorF64I64MinkowskiF64,
  MinkowskiF64,
  KNNRegressorF64F64MinkowskiF64,
} from '../../../core-bindings/index.js'
import { GenericKNNRegressor } from './generic.js'
import { type IKNNRegressorParameters, type YTypeKey } from './index.js'
import { type XType, type YType } from '../../index.js'

class KNNRegressorMinkowski {
  private regressor: GenericKNNRegressor<KNNRegressorF64MinkowskiF64Parameters>

  constructor(params?: IKNNRegressorParameters) {
    if (!params?.p) {
      throw new Error("'p' must be provided for Minkowski")
    }
    const p = new KNNRegressorF64EuclidianF64Parameters().withDistanceMinkowskiF64(new MinkowskiF64(params.p))
    if (params?.k) p.withK(params.k)
    if (params?.algorithm) p.withAlgorithm(params.algorithm)
    if (params?.weight) p.withWeight(params.weight)

    this.regressor = new GenericKNNRegressor(p, {
      bigI64: KNNRegressorF64BigI64MinkowskiF64,
      bigU64: KNNRegressorF64BigU64MinkowskiF64,
      i64: KNNRegressorF64I64MinkowskiF64,
      f64: KNNRegressorF64F64MinkowskiF64,
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

export { KNNRegressorMinkowski }
