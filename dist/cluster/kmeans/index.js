import {} from '../../index.js';
import {} from './parameters.js';
import {} from '../../estimator.js';
import { PredictorProvidersMap } from './estimator_providers_map/index.js';
class KMeans {
    constructor(params) {
        this.name = KMeans.className;
        this._isFitted = false;
        this.estimator = null;
        const config = params || {};
        this.config = config;
        this.config.targetType = this.config.targetType ?? 'f32';
        this.config.predictOutputType = this.config.predictOutputType ?? 'i32';
        const distanceTypeMap = PredictorProvidersMap.get(this.config.targetType);
        if (!distanceTypeMap) {
            throw new Error(`Invalid value for target type '${this.config.targetType}'`);
        }
        const estimatorProvider = distanceTypeMap.get(this.config.predictOutputType);
        if (!estimatorProvider) {
            throw new Error(`Invalid value for predict output type '${this.config.predictOutputType}' for '${this.config.targetType}'`);
        }
        const parameters = estimatorProvider.parameters(this.config);
        this.estimatorProvider = estimatorProvider;
        this.parameters = parameters;
    }
    fit(x, y) {
        this.estimator = this.estimatorProvider.estimator(x, y, this.parameters);
        this._isFitted = true;
        return this;
    }
    getComponentColumnName(index) {
        return `KMeans${index + 1}`;
    }
    ensureFitted(methodName) {
        if (!this._isFitted || this.estimator === null) {
            throw new Error(`${this.name}: Cannot call '${methodName}' before calling 'fit'. Please fit the model first.`);
        }
    }
    predict(matrix) {
        this.ensureFitted('predict');
        let denseMatrix = this.estimatorProvider.toMatrix(matrix);
        return this.estimator.predict(denseMatrix);
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
        let instance = new KMeans(data.config);
        instance._deserialize(data.data);
        instance._isFitted = true;
        return instance;
    }
}
KMeans.className = 'KMeans';
export { KMeans };
