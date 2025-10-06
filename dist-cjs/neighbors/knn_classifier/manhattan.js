"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KNNClassifierManhattan = void 0;
const index_js_1 = require("../../core-bindings/index.js");
const generic_js_1 = require("./generic.js");
class KNNClassifierManhattan {
    constructor(params) {
        const p = new index_js_1.KNNClassifierF64EuclidianF64Parameters().withDistanceManhattanF64(new index_js_1.ManhattanF64());
        if (params?.k)
            p.withK(params.k);
        if (params?.algorithm)
            p.withAlgorithm(params.algorithm);
        if (params?.weight)
            p.withWeight(params.weight);
        this.classifier = new generic_js_1.GenericKNNClassifier(p, {
            bigI64: index_js_1.KNNClassifierF64BigI64ManhattanF64,
            bigU64: index_js_1.KNNClassifierF64BigU64ManhattanF64,
            i64: index_js_1.KNNClassifierF64I64ManhattanF64,
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
exports.KNNClassifierManhattan = KNNClassifierManhattan;
