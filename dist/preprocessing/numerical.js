import { StandardScalerF64, StandardScalerParameters } from '../../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
import { BaseTransformer } from '../base_transformer.js';
class StandardScaler extends BaseTransformer {
    constructor(params) {
        const parameters = new StandardScalerParameters();
        const config = params || {};
        super(parameters);
        this.name = StandardScaler.className;
        this.config = config;
    }
    fitEstimator(matrix) {
        return new StandardScalerF64(matrix.asF64(), this.parameters);
    }
    transformMatrix(matrix) {
        return new DenseMatrix(this.estimator.transform(matrix.asF64()));
    }
    getComponentColumnName(index) {
        return `SS${index + 1}`;
    }
    serialize() {
        this.ensureFitted('serialize');
        return {
            columns: this.columns,
            data: this.estimator.serialize(),
            params: this.config,
        };
    }
    static deserialize(serializedData) {
        const estimator = StandardScalerF64.deserialize(serializedData.data);
        const instance = new StandardScaler(serializedData.params);
        instance.estimator = estimator;
        instance.columns = serializedData.columns;
        instance._isFitted = true;
        return instance;
    }
}
StandardScaler.className = 'StandardScaler';
export default StandardScaler;
