import { DenseMatrix, utilities } from '../../index.js';
import {} from '../../estimator.js';
import { TransformerProvidersMap } from './estimator_providers_map/index.js';
class OneHotEncoder {
    constructor(params) {
        this.name = OneHotEncoder.className;
        this._isFitted = false;
        this.estimator = null;
        this.config = params;
        this.config.targetType = this.config.targetType ?? 'f32';
        const estimatorProvider = TransformerProvidersMap.get(this.config.targetType);
        if (!estimatorProvider) {
            throw new Error(`Invalid value for target type '${this.config.targetType}'`);
        }
        const parameters = estimatorProvider.parameters(this.config);
        this.estimatorProvider = estimatorProvider;
        this.parameters = parameters;
    }
    fit(x, y) {
        const matrix = utilities.inputTypeToDenseMatrix(x);
        this.estimator = this.estimatorProvider.estimator(matrix, y, this.parameters);
        this._isFitted = true;
        return this;
    }
    getComponentColumnName(index) {
        return `OneHotEncoder${index + 1}`;
    }
    ensureFitted(methodName) {
        if (!this._isFitted || this.estimator === null) {
            throw new Error(`${this.name}: Cannot call '${methodName}' before calling 'fit'. Please fit the model first.`);
        }
    }
    transform(matrix) {
        this.ensureFitted('transform');
        let denseMatrix = this.estimatorProvider.toMatrix(utilities.inputTypeToDenseMatrix(matrix));
        return new DenseMatrix(this.estimator.transform(denseMatrix));
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
        let instance = new OneHotEncoder(data.config);
        instance._deserialize(data.data);
        instance._isFitted = true;
        return instance;
    }
}
OneHotEncoder.className = 'OneHotEncoder';
export { OneHotEncoder };
