import {} from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { DenseMatrixF64, SVDF64, SVDParameters } from '../../../core-bindings/index.js';
import {} from '../index.js';
import {} from '../../../estimator.js';
import { setSVDParametersValues } from './index.js';
class SVDF64Provider {
    parameters(config) {
        const parameters = new SVDParameters();
        setSVDParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsF64 = x.asRsMatrix('f64');
        return SVDF64.fit(xAsF64, parameters);
    }
    toMatrix(x) {
        return x.asRsMatrix('f64');
    }
    deserialize(data) {
        return SVDF64.deserialize(data);
    }
}
export default SVDF64Provider;
