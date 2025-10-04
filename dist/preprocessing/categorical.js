import { OneHotEncoderF64, OneHotEncoderParameters } from '../../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
import { BaseTransformer } from '../base_transformer.js';
class OneHotEncoder extends BaseTransformer {
    constructor(params) {
        const parameters = new OneHotEncoderParameters(params.categoricalParams);
        super(parameters);
        this.name = OneHotEncoder.className;
    }
    fitEstimator(matrix) {
        return new OneHotEncoderF64(matrix.asF64(), this.parameters);
    }
    transformMatrix(matrix) {
        return new DenseMatrix(this.estimator.transform(matrix.asF64()));
    }
    getComponentColumnName(index) {
        return `SS${index + 1}`;
    }
    serialize() {
        this.ensureFitted('serialize');
        throw new Error(`${this.name}: Unimplemented!`);
    }
}
OneHotEncoder.className = 'OneHotEncoder';
export default OneHotEncoder;
