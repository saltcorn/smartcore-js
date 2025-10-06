"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KNNRegressorMinkowski = void 0;
const index_js_1 = require("../../core-bindings/index.js");
const generic_js_1 = require("./generic.js");
class KNNRegressorMinkowski {
    constructor(params) {
        if (!params?.p) {
            throw new Error("'p' must be provided for Minkowski");
        }
        const p = new index_js_1.KNNRegressorF64EuclidianF64Parameters().withDistanceMinkowskiF64(new index_js_1.MinkowskiF64(params.p));
        if (params?.k)
            p.withK(params.k);
        if (params?.algorithm)
            p.withAlgorithm(params.algorithm);
        if (params?.weight)
            p.withWeight(params.weight);
        this.regressor = new generic_js_1.GenericKNNRegressor(p, {
            bigI64: index_js_1.KNNRegressorF64BigI64MinkowskiF64,
            bigU64: index_js_1.KNNRegressorF64BigU64MinkowskiF64,
            i64: index_js_1.KNNRegressorF64I64MinkowskiF64,
            f64: index_js_1.KNNRegressorF64F64MinkowskiF64,
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
exports.KNNRegressorMinkowski = KNNRegressorMinkowski;
