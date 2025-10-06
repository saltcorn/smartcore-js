"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KNNRegressorEuclidian = void 0;
const index_js_1 = require("../../../core-bindings/index.js");
const generic_js_1 = require("./generic.js");
class KNNRegressorEuclidian {
    constructor(params) {
        const p = new index_js_1.KNNRegressorF64EuclidianF64Parameters();
        if (params?.k)
            p.withK(params.k);
        if (params?.algorithm)
            p.withAlgorithm(params.algorithm);
        if (params?.weight)
            p.withWeight(params.weight);
        this.regressor = new generic_js_1.GenericKNNRegressor(p, {
            bigI64: index_js_1.KNNRegressorF64BigI64EuclidianF64,
            bigU64: index_js_1.KNNRegressorF64BigU64EuclidianF64,
            i64: index_js_1.KNNRegressorF64I64EuclidianF64,
            f64: index_js_1.KNNRegressorF64F64EuclidianF64,
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
exports.KNNRegressorEuclidian = KNNRegressorEuclidian;
