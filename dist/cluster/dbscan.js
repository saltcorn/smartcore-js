import { DBSCANF64EuclidianF64Parameters, DBSCANF64F64EuclidianF64, DBSCANF64F64HammingF64, DBSCANF64F64MahalanobisF64, DBSCANF64F64ManhattanF64, DBSCANF64F64MinkowskiF64, EuclidianF64, HammingF64, MahalanobisF64, ManhattanF64, MinkowskiF64, } from '../../core-bindings/index.js';
import { DBSCANF64HammingF64Parameters, DBSCANF64MahalanobisF64Parameters, DBSCANF64ManhattanF64Parameters, DBSCANF64MinkowskiF64Parameters, } from '../../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
class DBSCAN {
    constructor(params) {
        this.estimator = null;
        this.name = DBSCAN.className;
        this.parameters = new DBSCANF64EuclidianF64Parameters();
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
            if (params.distance && this.parameters instanceof DBSCANF64EuclidianF64Parameters) {
                if (params.distance instanceof HammingF64) {
                    this.parameters = this.parameters.withDistanceHammingF64(params.distance);
                }
                else if (params.distance instanceof MahalanobisF64) {
                    this.parameters = this.parameters.withDistanceMahalanobisF64(params.distance);
                }
                else if (params.distance instanceof ManhattanF64) {
                    this.parameters = this.parameters.withDistanceManhattanF64(params.distance);
                }
                else if (params.distance instanceof MinkowskiF64) {
                    this.parameters = this.parameters.withDistanceMinkowskiF64(params.distance);
                }
            }
        }
    }
    fit(x, y) {
        let matrix = x instanceof DenseMatrix ? x : DenseMatrix.f64(x);
        if (!y || y.length === 0) {
            throw new Error('Input arrays cannot be empty.');
        }
        if (y instanceof Float64Array) {
            if (this.parameters instanceof DBSCANF64EuclidianF64Parameters) {
                this.estimator = DBSCANF64F64EuclidianF64.fit(matrix.asF64(), this.parameters);
            }
            else if (this.parameters instanceof DBSCANF64HammingF64Parameters) {
                this.estimator = DBSCANF64F64HammingF64.fit(matrix.asF64(), this.parameters);
            }
            else if (this.parameters instanceof DBSCANF64MahalanobisF64Parameters) {
                this.estimator = DBSCANF64F64MahalanobisF64.fit(matrix.asF64(), this.parameters);
            }
            else if (this.parameters instanceof DBSCANF64ManhattanF64Parameters) {
                this.estimator = DBSCANF64F64ManhattanF64.fit(matrix.asF64(), this.parameters);
            }
            else if (this.parameters instanceof DBSCANF64MinkowskiF64Parameters) {
                this.estimator = DBSCANF64F64MinkowskiF64.fit(matrix.asF64(), this.parameters);
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
        let matrix = x instanceof DenseMatrix ? x : DenseMatrix.f64(x);
        return this.estimator.predict(matrix.asF64());
    }
    serialize() {
        return this.estimator?.serialize();
    }
    static deserialize(data) {
        let estimator = DBSCANF64F64EuclidianF64.deserialize(data);
        let instance = new DBSCAN();
        instance.estimator = estimator;
        return instance;
    }
}
DBSCAN.className = 'DBSCAN';
export { DBSCAN };
