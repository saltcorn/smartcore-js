import { SVDF64, SVDParameters } from '../../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
import { BaseTransformer } from '../base_transformer.js';
class SVD extends BaseTransformer {
    constructor(params) {
        const parameters = new SVDParameters();
        const config = params || {};
        if (config.nComponents !== undefined) {
            parameters.withNComponents(config.nComponents);
        }
        super(parameters);
        this.name = SVD.className;
        this.config = config;
    }
    fitEstimator(matrix) {
        return SVDF64.fit(matrix.asF64(), this.parameters);
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
        const estimator = SVDF64.deserialize(serializedData.data);
        const instance = new SVD(serializedData.params);
        instance.estimator = estimator;
        instance.columns = serializedData.columns;
        instance._isFitted = true;
        return instance;
    }
}
SVD.className = 'SVD';
export { SVD };
