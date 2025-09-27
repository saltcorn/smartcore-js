import {} from '../../../core-bindings/index.js';
import { KNNRegressorEuclidian } from './euclidian.js';
import { KNNRegressorHamming } from './hamming.js';
import { KNNRegressorMahalanobis } from './mahalanobis.js';
import { KNNRegressorManhattan } from './manhattan.js';
import { KNNRegressorMinkowski } from './minkowski.js';
var DistanceType;
(function (DistanceType) {
    DistanceType[DistanceType["EUCLIDIAN"] = 0] = "EUCLIDIAN";
    DistanceType[DistanceType["HAMMING"] = 1] = "HAMMING";
    DistanceType[DistanceType["MANHATTAN"] = 2] = "MANHATTAN";
    DistanceType[DistanceType["MAHALANOBIS"] = 3] = "MAHALANOBIS";
    DistanceType[DistanceType["MINKOWSKI"] = 4] = "MINKOWSKI";
})(DistanceType || (DistanceType = {}));
var EstimatorType;
(function (EstimatorType) {
    EstimatorType[EstimatorType["F64F64"] = 0] = "F64F64";
    EstimatorType[EstimatorType["F64I64"] = 1] = "F64I64";
    EstimatorType[EstimatorType["F64BigI64"] = 2] = "F64BigI64";
    EstimatorType[EstimatorType["F64BigU64"] = 3] = "F64BigU64";
})(EstimatorType || (EstimatorType = {}));
class KNNRegressor {
    constructor(params) {
        switch (params?.distance) {
            case undefined:
            case DistanceType.EUCLIDIAN:
                this.estimator = new KNNRegressorEuclidian(params);
                break;
            case DistanceType.HAMMING:
                this.estimator = new KNNRegressorHamming(params);
                break;
            case DistanceType.MAHALANOBIS:
                this.estimator = new KNNRegressorMahalanobis(params);
                break;
            case DistanceType.MANHATTAN:
                this.estimator = new KNNRegressorManhattan(params);
                break;
            case DistanceType.MINKOWSKI:
                this.estimator = new KNNRegressorMinkowski(params);
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
            case DistanceType.EUCLIDIAN:
                instance.estimator = KNNRegressorEuclidian.deserialize(data, estimatorType);
                break;
            case DistanceType.HAMMING:
                instance.estimator = KNNRegressorHamming.deserialize(data, estimatorType);
                break;
            case DistanceType.MAHALANOBIS:
                instance.estimator = KNNRegressorMahalanobis.deserialize(data, estimatorType);
                break;
            case DistanceType.MANHATTAN:
                instance.estimator = KNNRegressorManhattan.deserialize(data, estimatorType);
                break;
            case DistanceType.MINKOWSKI:
                instance.estimator = KNNRegressorMinkowski.deserialize(data, estimatorType);
                break;
        }
        return instance;
    }
}
export { KNNRegressor, EstimatorType };
