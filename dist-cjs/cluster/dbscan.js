"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBSCAN = void 0;
const index_js_1 = require("../../core-bindings/index.js");
const base_predictor_js_1 = require("../base_predictor.js");
class DBSCAN extends base_predictor_js_1.BasePredictor {
    constructor(params) {
        let parameters = new index_js_1.DBSCANF64EuclidianF64Parameters();
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
        if (config.distance && parameters instanceof index_js_1.DBSCANF64EuclidianF64Parameters) {
            if (config.distance instanceof index_js_1.HammingF64) {
                parameters = parameters.withDistanceHammingF64(config.distance);
            }
            else if (config.distance instanceof index_js_1.MahalanobisF64) {
                parameters = parameters.withDistanceMahalanobisF64(config.distance);
            }
            else if (config.distance instanceof index_js_1.ManhattanF64) {
                parameters = parameters.withDistanceManhattanF64(config.distance);
            }
            else if (config.distance instanceof index_js_1.MinkowskiF64) {
                parameters = parameters.withDistanceMinkowskiF64(config.distance);
            }
        }
        super(parameters);
        this.name = DBSCAN.className;
        this.config = config;
        this.estimatorClasses = {
            EuclidianF64: index_js_1.DBSCANF64F64EuclidianF64,
            HammingF64: index_js_1.DBSCANF64F64HammingF64,
            MahalanobisF64: index_js_1.DBSCANF64F64MahalanobisF64,
            ManhattanF64: index_js_1.DBSCANF64F64ManhattanF64,
            MinkowskiF64: index_js_1.DBSCANF64F64MinkowskiF64,
        };
    }
    get distanceKey() {
        return DBSCAN.getDistanceKey(this.config.distance);
    }
    static getDistanceKey(distance) {
        if (distance instanceof index_js_1.EuclidianF64 || distance === undefined)
            return 'EuclidianF64';
        if (distance instanceof index_js_1.HammingF64)
            return 'HammingF64';
        if (distance instanceof index_js_1.MahalanobisF64)
            return 'MahalanobisF64';
        if (distance instanceof index_js_1.ManhattanF64)
            return 'ManhattanF64';
        if (distance instanceof index_js_1.MinkowskiF64)
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
exports.DBSCAN = DBSCAN;
DBSCAN.className = 'DBSCAN';
