import {} from '../../../core-bindings/index.js';
import { DistanceType } from '../../metrics/index.js';
import { KNNRegressorEuclidian } from './euclidian.js';
import { KNNRegressorHamming } from './hamming.js';
import { KNNRegressorMahalanobis } from './mahalanobis.js';
import { KNNRegressorManhattan } from './manhattan.js';
import { KNNRegressorMinkowski } from './minkowski.js';
class KNNRegressor {
    constructor(params) {
        this.name = KNNRegressor.className;
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
    deserialize(data, yType) {
        this.estimator.deserialize(data, yType);
        return this;
    }
}
KNNRegressor.className = 'KNNRegressor';
export { KNNRegressor };
