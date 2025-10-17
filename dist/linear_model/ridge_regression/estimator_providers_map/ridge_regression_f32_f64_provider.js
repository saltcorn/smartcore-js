import {} from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { DenseMatrixF32, RidgeRegressionF32F64, RidgeRegressionF32Parameters } from '../../../core-bindings/index.js';
import {} from '../index.js';
import {} from '../../../estimator.js';
import { setRidgeRegressionParametersValues } from './index.js';
import { yAsFloat64Array } from '../../../utilities/index.js';
class RidgeRegressionF32F64Provider {
    parameters(config) {
        const parameters = new RidgeRegressionF32Parameters();
        setRidgeRegressionParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, y, parameters) {
        const xAsF32 = x.asRsMatrix('f32');
        const yAsF64 = yAsFloat64Array(y);
        return RidgeRegressionF32F64.fit(xAsF32, yAsF64, parameters);
    }
    toMatrix(x) {
        return x.asRsMatrix('f32');
    }
    deserialize(data) {
        return RidgeRegressionF32F64.deserialize(data);
    }
}
export default RidgeRegressionF32F64Provider;
