import { BasePredictor } from '../../base_predictor.js';
import {} from '../../base_estimator.js';
import { DenseMatrix } from '../../linalg/index.js';
import { estimatorClasses, getParametersInstance, } from './parameters.js';
class DBSCAN extends BasePredictor {
    constructor(params) {
        const config = params || {};
        super(getParametersInstance(config));
        this.name = DBSCAN.className;
        this.config = config;
        this.estimatorClasses = estimatorClasses;
    }
    static defaultDistanceKey() {
        return 'EuclidianF32';
    }
    get distanceKey() {
        return this.config.distance || DBSCAN.defaultDistanceKey();
    }
    fitEstimator(matrix, _y) {
        const EstimatorClass = this.estimatorClasses[this.distanceKey];
        return EstimatorClass.fit(matrix.asRsMatrix(), this.parameters);
    }
    getComponentColumnName(index) {
        return `DBSCAN${index + 1}`;
    }
    predictMatrix(matrix) {
        return this.estimator.predict(matrix.asRsMatrix());
    }
    serialize() {
        this.ensureFitted('serialize');
        return {
            columns: this.columns,
            data: this.estimator.serialize(),
            params: this.config,
            yType: this._yType,
        };
    }
    static deserialize(data) {
        let instance = new DBSCAN(data.params);
        const EstimatorClass = instance.estimatorClasses[data.params.distance || DBSCAN.defaultDistanceKey()];
        if (EstimatorClass === null) {
            throw new Error(`${this.name}: Unexpected yType value '${data.yType}'`);
        }
        instance.estimator = EstimatorClass.deserialize(data.data);
        instance._isFitted = true;
        instance._yType = data.yType;
        return instance;
    }
}
DBSCAN.className = 'DBSCAN';
export { DBSCAN };
