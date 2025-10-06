"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KNNClassifier = void 0;
const index_js_1 = require("../../metrics/index.js");
const euclidian_js_1 = require("./euclidian.js");
const hamming_js_1 = require("./hamming.js");
const mahalanobis_js_1 = require("./mahalanobis.js");
const manhattan_js_1 = require("./manhattan.js");
const minkowski_js_1 = require("./minkowski.js");
class KNNClassifier {
    constructor(params) {
        this.name = KNNClassifier.className;
        switch (params?.distance) {
            case undefined:
            case index_js_1.DistanceType.EUCLIDIAN:
                this.estimator = new euclidian_js_1.KNNClassifierEuclidian(params);
                break;
            case index_js_1.DistanceType.HAMMING:
                this.estimator = new hamming_js_1.KNNClassifierHamming(params);
                break;
            case index_js_1.DistanceType.MAHALANOBIS:
                this.estimator = new mahalanobis_js_1.KNNClassifierMahalanobis(params);
                break;
            case index_js_1.DistanceType.MANHATTAN:
                this.estimator = new manhattan_js_1.KNNClassifierManhattan(params);
                break;
            case index_js_1.DistanceType.MINKOWSKI:
                this.estimator = new minkowski_js_1.KNNClassifierMinkowski(params);
                break;
            default:
                throw new Error('Unrecognized distance type');
        }
    }
    fit(x, y) {
        this.estimator.fit(x, y);
        return this;
    }
    predict(x) {
        return this.estimator.predict(x);
    }
    serialize() {
        return this.estimator?.serialize();
    }
    deserialize(data, yType) {
        this.estimator.deserialize(data, yType);
        return this;
    }
}
exports.KNNClassifier = KNNClassifier;
KNNClassifier.className = 'KNNClassifier';
