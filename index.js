"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinearRegression = void 0;
var index_js_1 = require("./core-bindings/index.js");
var DenseMatrix = /** @class */ (function () {
    function DenseMatrix(data, columnMajor) {
        if (!(data instanceof Array)) {
            throw new Error('Expected data to be an array.');
        }
        var nrows = data.length;
        var ncols = data[0] instanceof Array ? data[0].length : 0;
        var valuesFlat = data.flat();
        if (valuesFlat.every(function (val) { return Number.isInteger(val); })) {
            this.inner = new index_js_1.DenseMatrixI64(nrows, ncols, valuesFlat, columnMajor);
        }
        else {
            this.inner = new index_js_1.DenseMatrixF64(nrows, ncols, new Float64Array(valuesFlat), columnMajor);
        }
    }
    return DenseMatrix;
}());
var LinearRegression = /** @class */ (function () {
    function LinearRegression() {
        this.inner = null;
    }
    LinearRegression.prototype.fit = function (x, y, parameters) {
        var matrix = x instanceof DenseMatrix ? x : new DenseMatrix(x);
        if (!y || y.length === 0) {
            throw new Error('Input arrays cannot be empty.');
        }
        if (matrix.inner instanceof index_js_1.DenseMatrixF64) {
            if (y.every(function (val) { return Number.isInteger(val); })) {
                this.inner = index_js_1.LinearRegressionF64I64.fit(matrix.inner, y, parameters);
            }
            else {
                throw new Error("Mismatch: 'x' is BigInt, but 'y' is not fully BigInt.");
            }
        }
        else if (typeof xFlat[0] === 'number') {
            // All elements must be numbers for Float64Array
            if (y.every(function (val) { return typeof val === 'number'; })) {
                var xArray = new Float64Array(xFlat);
                var yArray = new Float64Array(y);
                // inner = new LinearRegressionF32F32(xArray, yArray); // Assuming this external class exists
                console.log('Constructing Number-based regression model...');
                inner = { x: xArray, y: yArray }; // Placeholder for external constructor
            }
            else {
                throw new Error("Mismatch: 'x' is Number, but 'y' is not fully Number.");
            }
        }
        else {
            throw new Error('Unsupported data type for input arrays.');
        }
        // Return a new instance of the class with the initialized `inner` object
        return new LinearRegression(inner);
    };
    return LinearRegression;
}());
exports.LinearRegression = LinearRegression;
