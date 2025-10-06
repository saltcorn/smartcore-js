"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KNNClassifierMinkowski = void 0;
const index_js_1 = require("../../core-bindings/index.js");
const generic_js_1 = require("./generic.js");
class KNNClassifierMinkowski {
    constructor(params) {
        if (!params?.p) {
            throw new Error("'p' must be provided for Minkowski");
        }
        const p = new index_js_1.KNNClassifierF64EuclidianF64Parameters().withDistanceMinkowskiF64(new index_js_1.MinkowskiF64(params.p));
        if (params?.k)
            p.withK(params.k);
        if (params?.algorithm)
            p.withAlgorithm(params.algorithm);
        if (params?.weight)
            p.withWeight(params.weight);
        this.classifier = new generic_js_1.GenericKNNClassifier(p, {
            bigI64: index_js_1.KNNClassifierF64BigI64MinkowskiF64,
            bigU64: index_js_1.KNNClassifierF64BigU64MinkowskiF64,
            i64: index_js_1.KNNClassifierF64I64MinkowskiF64,
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
exports.KNNClassifierMinkowski = KNNClassifierMinkowski;
