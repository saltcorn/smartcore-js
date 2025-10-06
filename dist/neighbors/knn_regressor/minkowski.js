import { KNNRegressorF64EuclidianF64Parameters, KNNRegressorF64MinkowskiF64Parameters, KNNRegressorF64BigI64MinkowskiF64, KNNRegressorF64BigU64MinkowskiF64, KNNRegressorF64I64MinkowskiF64, MinkowskiF64, KNNRegressorF64F64MinkowskiF64, } from '../../core-bindings/index.js';
import { GenericKNNRegressor } from './generic.js';
import {} from './index.js';
import {} from '../../index.js';
class KNNRegressorMinkowski {
    constructor(params) {
        if (!params?.p) {
            throw new Error("'p' must be provided for Minkowski");
        }
        const p = new KNNRegressorF64EuclidianF64Parameters().withDistanceMinkowskiF64(new MinkowskiF64(params.p));
        if (params?.k)
            p.withK(params.k);
        if (params?.algorithm)
            p.withAlgorithm(params.algorithm);
        if (params?.weight)
            p.withWeight(params.weight);
        this.regressor = new GenericKNNRegressor(p, {
            bigI64: KNNRegressorF64BigI64MinkowskiF64,
            bigU64: KNNRegressorF64BigU64MinkowskiF64,
            i64: KNNRegressorF64I64MinkowskiF64,
            f64: KNNRegressorF64F64MinkowskiF64,
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
export { KNNRegressorMinkowski };
