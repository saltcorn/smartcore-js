import { PCAF64, PCAParameters } from '../../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
import { BaseDecomposition } from './base.js';
class PCA extends BaseDecomposition {
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
    /**
     * Create a name for a column given its index
     * @param {number} index - The index of the column
     * @returns {string} The column name derived from the provided index
     */
    getComponentColumnName(index) {
        return `PC${index + 1}`;
    }
    /**
     * @returns An Object containing information that can be used to reinstantiate an identical PCA instance
     */
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
     * @param {PCASerializedData} serializedData
     * @returns {PCA} A PCA instance
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
