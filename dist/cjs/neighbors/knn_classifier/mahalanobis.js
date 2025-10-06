"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KNNClassifierMahalanobis = void 0;
const index_js_1 = require("../../../core-bindings/index.js");
const generic_js_1 = require("./generic.js");
const index_js_2 = require("../../index.js");
class KNNClassifierMahalanobis {
    constructor(params) {
        if (!params?.data) {
            throw new Error("Mahalanobis requires 'data' to be defined!");
        }
        let data = params.data instanceof index_js_2.DenseMatrix ? params.data : new index_js_2.DenseMatrix(params.data);
        const p = new index_js_1.KNNClassifierF64EuclidianF64Parameters().withDistanceMahalanobisF64(new index_js_1.MahalanobisF64(data.asF64()));
        if (params?.k)
            p.withK(params.k);
        if (params?.algorithm)
            p.withAlgorithm(params.algorithm);
        if (params?.weight)
            p.withWeight(params.weight);
        this.classifier = new generic_js_1.GenericKNNClassifier(p, {
            bigI64: index_js_1.KNNClassifierF64BigI64MahalanobisF64,
            bigU64: index_js_1.KNNClassifierF64BigU64MahalanobisF64,
            i64: index_js_1.KNNClassifierF64I64MahalanobisF64,
        });
    }
    fit(x, y) {
        return (this.classifier.fit(x, y), this);
    }
    predict(x) {
        return this.classifier.predict(x);
    }
    serialize() {
        return this.classifier.serialize();
    }
    deserialize(data, key) {
        this.deserialize(data, key);
    }
}
exports.KNNClassifierMahalanobis = KNNClassifierMahalanobis;
