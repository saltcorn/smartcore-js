import { SVDF64, SVDParameters } from '../../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
class SVD {
    constructor(params) {
        this.estimator = null;
        this.parameters = new SVDParameters();
        if (params) {
            if (params.nComponents !== undefined) {
                this.parameters.withNComponents(params.nComponents);
            }
        }
    }
    fit(x, y) {
        let matrix = x instanceof DenseMatrix ? x : DenseMatrix.f64(x);
        if (!y || y.length === 0) {
            throw new Error('Input arrays cannot be empty.');
        }
        if (y instanceof Float64Array) {
            this.estimator = SVDF64.fit(matrix.asF64(), this.parameters);
        }
        else {
            throw new Error('Unsupported data type for input arrays.');
        }
        return this;
    }
    transform(x) {
        if (this.estimator === null) {
            throw new Error("The 'fit' method should called before the 'predict' method is called.");
        }
        let matrix = x instanceof DenseMatrix ? x : DenseMatrix.f64(x);
        return new DenseMatrix(this.estimator.transform(matrix.asF64()));
    }
    serialize() {
        return this.estimator?.serialize();
    }
    static deserialize(data) {
        let estimator = SVDF64.deserialize(data);
        let instance = new SVD();
        instance.estimator = estimator;
        return instance;
    }
}
export { SVD };
