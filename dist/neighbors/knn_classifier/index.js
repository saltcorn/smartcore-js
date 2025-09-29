import {} from '../../../core-bindings/index.js';
import { DistanceType } from '../../metrics/index.js';
import { KNNClassifierEuclidian } from './euclidian.js';
import { KNNClassifierHamming } from './hamming.js';
import { KNNClassifierMahalanobis } from './mahalanobis.js';
import { KNNClassifierManhattan } from './manhattan.js';
import { KNNClassifierMinkowski } from './minkowski.js';
var EstimatorType;
(function (EstimatorType) {
    EstimatorType[EstimatorType["F64I64"] = 0] = "F64I64";
    EstimatorType[EstimatorType["F64BigI64"] = 1] = "F64BigI64";
    EstimatorType[EstimatorType["F64BigU64"] = 2] = "F64BigU64";
})(EstimatorType || (EstimatorType = {}));
class KNNClassifier {
    constructor(params) {
        switch (params?.distance) {
            case undefined:
            case DistanceType.EUCLIDIAN:
                this.estimator = new KNNClassifierEuclidian(params);
                break;
            case DistanceType.HAMMING:
                this.estimator = new KNNClassifierHamming(params);
                break;
            case DistanceType.MAHALANOBIS:
                this.estimator = new KNNClassifierMahalanobis(params);
                break;
            case DistanceType.MANHATTAN:
                this.estimator = new KNNClassifierManhattan(params);
                break;
            case DistanceType.MINKOWSKI:
                this.estimator = new KNNClassifierMinkowski(params);
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
        let instance = new KNNClassifier();
        switch (distanceType) {
            case DistanceType.EUCLIDIAN:
                instance.estimator = KNNClassifierEuclidian.deserialize(data, estimatorType);
                break;
            case DistanceType.HAMMING:
                instance.estimator = KNNClassifierHamming.deserialize(data, estimatorType);
                break;
            case DistanceType.MAHALANOBIS:
                instance.estimator = KNNClassifierMahalanobis.deserialize(data, estimatorType);
                break;
            case DistanceType.MANHATTAN:
                instance.estimator = KNNClassifierManhattan.deserialize(data, estimatorType);
                break;
            case DistanceType.MINKOWSKI:
                instance.estimator = KNNClassifierMinkowski.deserialize(data, estimatorType);
                break;
        }
        return instance;
    }
}
export { KNNClassifier, EstimatorType };
