"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SVD = void 0;
const index_js_1 = require("../../index.js");
const index_js_2 = require("./estimator_providers_map/index.js");
const data_frame_js_1 = require("../../data_frame.js");
class SVD {
    constructor(params) {
        this.name = SVD.className;
        this._isFitted = false;
        this.estimator = null;
        this.config = params ?? {};
        this.config.targetType = this.config.targetType ?? 'f32';
        const estimatorProvider = index_js_2.TransformerProvidersMap.get(this.config.targetType);
        if (!estimatorProvider) {
            throw new Error(`Invalid value for target type '${this.config.targetType}'`);
        }
        const parameters = estimatorProvider.parameters(this.config);
        this.estimatorProvider = estimatorProvider;
        this.parameters = parameters;
    }
    get columns() {
        return this.config.columns ?? null;
    }
    fit(x, y) {
        let matrix;
        if (x instanceof data_frame_js_1.DataFrame && this.columns !== null && this.columns.length !== 0)
            matrix = index_js_1.utilities.dataFrameToDenseMatrix(x, this.columns);
        else
            matrix = index_js_1.utilities.inputTypeToDenseMatrix(x);
        this.estimator = this.estimatorProvider.estimator(matrix, y, this.parameters);
        this._isFitted = true;
        return this;
    }
    getComponentColumnName(index) {
        return `SVD${index + 1}`;
    }
    ensureFitted(methodName) {
        if (!this._isFitted || this.estimator === null) {
            throw new Error(`${this.name}: Cannot call '${methodName}' before calling 'fit'. Please fit the model first.`);
        }
    }
    transform(x) {
        this.ensureFitted('transform');
        if (x instanceof data_frame_js_1.DataFrame) {
            const columns = Array.isArray(this.columns) ? this.columns : x.columnNames;
            const matrix = index_js_1.utilities.dataFrameToDenseMatrix(x, columns);
            const matrixRs = this.estimatorProvider.toMatrix(matrix);
            const transformedMatrix = this.estimator.transform(matrixRs);
            const transformed = index_js_1.utilities.denseMatrixToDataFrame(new index_js_1.DenseMatrix(transformedMatrix), columns);
            const remaining = index_js_1.utilities.getRemainingColumns(x, columns);
            return index_js_1.utilities.combineDataFrames(transformed, remaining);
        }
        const matrixRs = this.estimatorProvider.toMatrix(index_js_1.utilities.inputTypeToDenseMatrix(x));
        return new index_js_1.DenseMatrix(this.estimator.transform(matrixRs));
    }
    serialize() {
        this.ensureFitted('serialize');
        return {
            data: this.estimator.serialize(),
            config: this.config,
        };
    }
    _deserialize(data) {
        if (this._isFitted) {
            throw new Error("Cannot call 'deserialize' on a fitted instance!");
        }
        this.estimator = this.estimatorProvider.deserialize(data);
        return this;
    }
    static deserialize(data) {
        let instance = new SVD(data.config);
        instance._deserialize(data.data);
        instance._isFitted = true;
        return instance;
    }
}
exports.SVD = SVD;
SVD.className = 'SVD';
