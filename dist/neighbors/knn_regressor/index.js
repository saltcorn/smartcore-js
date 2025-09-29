"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstimatorType = exports.KNNRegressor = void 0;
const index_js_1 = require("../../../core-bindings/index.js");
const index_js_2 = require("../../metrics/index.js");
const euclidian_js_1 = require("./euclidian.js");
const hamming_js_1 = require("./hamming.js");
const mahalanobis_js_1 = require("./mahalanobis.js");
const manhattan_js_1 = require("./manhattan.js");
const minkowski_js_1 = require("./minkowski.js");
var EstimatorType;
(function (EstimatorType) {
    EstimatorType[EstimatorType["F64F64"] = 0] = "F64F64";
    EstimatorType[EstimatorType["F64I64"] = 1] = "F64I64";
    EstimatorType[EstimatorType["F64BigI64"] = 2] = "F64BigI64";
    EstimatorType[EstimatorType["F64BigU64"] = 3] = "F64BigU64";
})(EstimatorType || (exports.EstimatorType = EstimatorType = {}));
class KNNRegressor {
    estimator;
    constructor(params) {
        switch (params?.distance) {
            case undefined:
            case index_js_2.DistanceType.EUCLIDIAN:
                this.estimator = new euclidian_js_1.KNNRegressorEuclidian(params);
                break;
            case index_js_2.DistanceType.HAMMING:
                this.estimator = new hamming_js_1.KNNRegressorHamming(params);
                break;
            case index_js_2.DistanceType.MAHALANOBIS:
                this.estimator = new mahalanobis_js_1.KNNRegressorMahalanobis(params);
                break;
            case index_js_2.DistanceType.MANHATTAN:
                this.estimator = new manhattan_js_1.KNNRegressorManhattan(params);
                break;
            case index_js_2.DistanceType.MINKOWSKI:
                this.estimator = new minkowski_js_1.KNNRegressorMinkowski(params);
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
    static deserialize(data, estimatorType, distanceType) {
        let instance = new KNNRegressor();
        switch (distanceType) {
            case index_js_2.DistanceType.EUCLIDIAN:
                instance.estimator = euclidian_js_1.KNNRegressorEuclidian.deserialize(data, estimatorType);
                break;
            case index_js_2.DistanceType.HAMMING:
                instance.estimator = hamming_js_1.KNNRegressorHamming.deserialize(data, estimatorType);
                break;
            case index_js_2.DistanceType.MAHALANOBIS:
                instance.estimator = mahalanobis_js_1.KNNRegressorMahalanobis.deserialize(data, estimatorType);
                break;
            case index_js_2.DistanceType.MANHATTAN:
                instance.estimator = manhattan_js_1.KNNRegressorManhattan.deserialize(data, estimatorType);
                break;
            case index_js_2.DistanceType.MINKOWSKI:
                instance.estimator = minkowski_js_1.KNNRegressorMinkowski.deserialize(data, estimatorType);
                break;
        }
        return instance;
    }
}
exports.KNNRegressor = KNNRegressor;
