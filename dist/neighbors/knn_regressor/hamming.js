import { KNNRegressorF64EuclidianF64Parameters, KNNRegressorF64HammingF64Parameters, KNNRegressorF64BigI64HammingF64, KNNRegressorF64BigU64HammingF64, KNNRegressorF64I64HammingF64, HammingF64, KNNRegressorF64F64HammingF64, } from '../../../core-bindings/index.js';
import { GenericKNNRegressor } from './generic.js';
import {} from './index.js';
import {} from '../../index.js';
class KNNRegressorHamming {
    constructor(params) {
        const p = new KNNRegressorF64EuclidianF64Parameters().withDistanceHammingF64(new HammingF64());
        if (params?.k)
            p.withK(params.k);
        if (params?.algorithm)
            p.withAlgorithm(params.algorithm);
        if (params?.weight)
            p.withWeight(params.weight);
        this.regressor = new GenericKNNRegressor(p, {
            bigI64: KNNRegressorF64BigI64HammingF64,
            bigU64: KNNRegressorF64BigU64HammingF64,
            i64: KNNRegressorF64I64HammingF64,
            f64: KNNRegressorF64F64HammingF64,
        });
    }
    fit(x, y) {
        return (this.regressor.fit(x, y), this);
    }
    predict(x) {
        return this.regressor.predict(x);
    }
    serialize() {
        return this.regressor.serialize();
    }
    deserialize(data, key) {
        this.deserialize(data, key);
    }
}
export { KNNRegressorHamming };
