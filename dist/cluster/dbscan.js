import { DBSCANF64EuclidianF64Parameters, DBSCANF64F64EuclidianF64, DBSCANF64F64HammingF64, DBSCANF64F64MahalanobisF64, DBSCANF64F64ManhattanF64, DBSCANF64F64MinkowskiF64, EuclidianF64, HammingF64, MahalanobisF64, ManhattanF64, MinkowskiF64, DBSCANF64HammingF64Parameters, DBSCANF64MahalanobisF64Parameters, DBSCANF64ManhattanF64Parameters, DBSCANF64MinkowskiF64Parameters, } from '../core-bindings/index.js';
import { BasePredictor } from '../base_predictor.js';
import {} from '../base_estimator.js';
import { DenseMatrix } from '../linalg/index.js';
class DBSCAN extends BasePredictor {
    constructor(params) {
        let parameters = new DBSCANF64EuclidianF64Parameters();
        const config = params || {};
        if (config.minSamples !== undefined) {
            parameters.withMinSamples(config.minSamples);
        }
        if (config.algorithm !== undefined) {
            parameters.withAlgorithm(config.algorithm);
        }
        if (config.eps !== undefined) {
            parameters.withEps(config.eps);
        }
        if (config.distance && parameters instanceof DBSCANF64EuclidianF64Parameters) {
            if (config.distance instanceof HammingF64) {
                parameters = parameters.withDistanceHammingF64(config.distance);
            }
            else if (config.distance instanceof MahalanobisF64) {
                parameters = parameters.withDistanceMahalanobisF64(config.distance);
            }
            else if (config.distance instanceof ManhattanF64) {
                parameters = parameters.withDistanceManhattanF64(config.distance);
            }
            else if (config.distance instanceof MinkowskiF64) {
                parameters = parameters.withDistanceMinkowskiF64(config.distance);
            }
        }
        super(parameters);
        this.name = DBSCAN.className;
        this.config = config;
        this.estimatorClasses = {
            EuclidianF64: DBSCANF64F64EuclidianF64,
            HammingF64: DBSCANF64F64HammingF64,
            MahalanobisF64: DBSCANF64F64MahalanobisF64,
            ManhattanF64: DBSCANF64F64ManhattanF64,
            MinkowskiF64: DBSCANF64F64MinkowskiF64,
        };
    }
    get distanceKey() {
        return DBSCAN.getDistanceKey(this.config.distance);
    }
    static getDistanceKey(distance) {
        if (distance instanceof EuclidianF64 || distance === undefined)
            return 'EuclidianF64';
        if (distance instanceof HammingF64)
            return 'HammingF64';
        if (distance instanceof MahalanobisF64)
            return 'MahalanobisF64';
        if (distance instanceof ManhattanF64)
            return 'ManhattanF64';
        if (distance instanceof MinkowskiF64)
            return 'MinkowskiF64';
        throw new Error(`${this.name}: Unexpected value of distance '${typeof distance}'`);
    }
    fitEstimator(matrix, _y) {
        const EstimatorClass = this.estimatorClasses[this.distanceKey];
        return EstimatorClass.fit(matrix.asF64(), this.parameters);
    }
    getComponentColumnName(index) {
        return `DBSCAN${index + 1}`;
    }
    predictMatrix(matrix) {
        return this.estimator.predict(matrix.asF64());
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
        let distanceKey = DBSCAN.getDistanceKey(data.params.distance);
        const EstimatorClass = instance.estimatorClasses[distanceKey];
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
