"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBSCAN = void 0;
const index_js_1 = require("../../core-bindings/index.js");
const index_js_2 = require("../../core-bindings/index.js");
const index_js_3 = require("../linalg/index.js");
class DBSCAN {
    parameters;
    estimator = null;
    constructor(params) {
        this.parameters = new index_js_1.DBSCANF64EuclidianF64Parameters();
        if (params) {
            if (params.minSamples !== undefined) {
                this.parameters.withMinSamples(params.minSamples);
            }
            if (params.algorithm !== undefined) {
                this.parameters.withAlgorithm(params.algorithm);
            }
            if (params.eps !== undefined) {
                this.parameters.withEps(params.eps);
            }
            if (params.distance && this.parameters instanceof index_js_1.DBSCANF64EuclidianF64Parameters) {
                if (params.distance instanceof index_js_1.HammingF64) {
                    this.parameters = this.parameters.withDistanceHammingF64(params.distance);
                }
                else if (params.distance instanceof index_js_1.MahalanobisF64) {
                    this.parameters = this.parameters.withDistanceMahalanobisF64(params.distance);
                }
                else if (params.distance instanceof index_js_1.ManhattanF64) {
                    this.parameters = this.parameters.withDistanceManhattanF64(params.distance);
                }
                else if (params.distance instanceof index_js_1.MinkowskiF64) {
                    this.parameters = this.parameters.withDistanceMinkowskiF64(params.distance);
                }
            }
        }
    }
    fit(x, y) {
        let matrix = x instanceof index_js_3.DenseMatrix ? x : index_js_3.DenseMatrix.f64(x);
        if (!y || y.length === 0) {
            throw new Error('Input arrays cannot be empty.');
        }
        if (y instanceof Float64Array) {
            if (this.parameters instanceof index_js_1.DBSCANF64EuclidianF64Parameters) {
                this.estimator = index_js_1.DBSCANF64F64EuclidianF64.fit(matrix.asF64(), this.parameters);
            }
            else if (this.parameters instanceof index_js_2.DBSCANF64HammingF64Parameters) {
                this.estimator = index_js_1.DBSCANF64F64HammingF64.fit(matrix.asF64(), this.parameters);
            }
            else if (this.parameters instanceof index_js_2.DBSCANF64MahalanobisF64Parameters) {
                this.estimator = index_js_1.DBSCANF64F64MahalanobisF64.fit(matrix.asF64(), this.parameters);
            }
            else if (this.parameters instanceof index_js_2.DBSCANF64ManhattanF64Parameters) {
                this.estimator = index_js_1.DBSCANF64F64ManhattanF64.fit(matrix.asF64(), this.parameters);
            }
            else if (this.parameters instanceof index_js_2.DBSCANF64MinkowskiF64Parameters) {
                this.estimator = index_js_1.DBSCANF64F64MinkowskiF64.fit(matrix.asF64(), this.parameters);
            }
        }
        else {
            throw new Error('Unsupported data type for input arrays.');
        }
        return this;
    }
    predict(x) {
        if (this.estimator === null) {
            throw new Error("The 'fit' method should called before the 'predict' method is called.");
        }
        let matrix = x instanceof index_js_3.DenseMatrix ? x : index_js_3.DenseMatrix.f64(x);
        return this.estimator.predict(matrix.asF64());
    }
    serialize() {
        return this.estimator?.serialize();
    }
    static deserialize(data) {
        let estimator = index_js_1.DBSCANF64F64EuclidianF64.deserialize(data);
        let instance = new DBSCAN();
        instance.estimator = estimator;
        return instance;
    }
}
exports.DBSCAN = DBSCAN;
