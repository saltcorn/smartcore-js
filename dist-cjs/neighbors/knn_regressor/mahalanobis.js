"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KNNRegressorMahalanobis = void 0;
const index_js_1 = require("../../core-bindings/index.js");
const generic_js_1 = require("./generic.js");
const index_js_2 = require("../../index.js");
class KNNRegressorMahalanobis {
    constructor(params) {
        if (!params?.data) {
            throw new Error("Mahalanobis requires 'data' to be defined!");
        }
        let data = params.data instanceof index_js_2.DenseMatrix ? params.data : new index_js_2.DenseMatrix(params.data);
        const p = new index_js_1.KNNRegressorF64EuclidianF64Parameters().withDistanceMahalanobisF64(new index_js_1.MahalanobisF64(data.asF64()));
        if (params?.k)
            p.withK(params.k);
        if (params?.algorithm)
            p.withAlgorithm(params.algorithm);
        if (params?.weight)
            p.withWeight(params.weight);
        this.regressor = new generic_js_1.GenericKNNRegressor(p, {
            bigI64: index_js_1.KNNRegressorF64BigI64MahalanobisF64,
            bigU64: index_js_1.KNNRegressorF64BigU64MahalanobisF64,
            i64: index_js_1.KNNRegressorF64I64MahalanobisF64,
            f64: index_js_1.KNNRegressorF64F64MahalanobisF64,
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
exports.KNNRegressorMahalanobis = KNNRegressorMahalanobis;
