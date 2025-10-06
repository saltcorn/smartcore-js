import { PCAF64, PCAParameters } from '../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
import { BaseTransformer } from '../base_transformer.js';
class PCA extends BaseTransformer {
    constructor(params) {
        const parameters = new PCAParameters();
        // Store config for serialization
        const config = params || {};
        if (config.nComponents !== undefined) {
            parameters.withNComponents(config.nComponents);
        }
        if (config.correlationMatrix !== undefined) {
            parameters.useCorrelationMatrix(config.correlationMatrix);
        }
        super(parameters);
        this.name = PCA.className;
        this.config = config;
    }
    fitEstimator(matrix) {
        return PCAF64.fit(matrix.asF64(), this.parameters);
    }
    transformMatrix(matrix) {
        return new DenseMatrix(this.estimator.transform(matrix.asF64()));
    }
    getComponentColumnName(index) {
        return `PC${index + 1}`;
    }
    serialize() {
        this.ensureFitted('serialize');
        return {
            columns: this.columns,
            data: this.estimator.serialize(),
            params: this.config,
        };
    }
    /**
     * Creates instance from serialized data
     */
    static deserialize(serializedData) {
        const estimator = PCAF64.deserialize(serializedData.data);
        const instance = new PCA(serializedData.params);
        instance.estimator = estimator;
        instance.columns = serializedData.columns;
        instance._isFitted = true;
        return instance;
    }
}
PCA.className = 'PCA';
export { PCA };
