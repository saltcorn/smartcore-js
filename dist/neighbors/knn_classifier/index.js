import {} from '../../../core-bindings/index.js';
import { DistanceType } from '../../metrics/index.js';
import { KNNClassifierEuclidian } from './euclidian.js';
import { KNNClassifierHamming } from './hamming.js';
import { KNNClassifierMahalanobis } from './mahalanobis.js';
import { KNNClassifierManhattan } from './manhattan.js';
import { KNNClassifierMinkowski } from './minkowski.js';
class KNNClassifier {
    constructor(params) {
        this.name = KNNClassifier.className;
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
    deserialize(data, yType) {
        this.estimator.deserialize(data, yType);
        return this;
    }
}
KNNClassifier.className = 'KNNClassifier';
export { KNNClassifier };
