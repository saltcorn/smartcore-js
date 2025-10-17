import {} from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { DenseMatrixF32, RidgeRegressionF32F32, RidgeRegressionF32Parameters } from '../../../core-bindings/index.js';
import {} from '../index.js';
import {} from '../../../estimator.js';
import { setRidgeRegressionParametersValues } from './index.js';
import { yAsFloat32Array } from '../../../utilities/index.js';
class RidgeRegressionF32F32Provider {
    parameters(config) {
        const parameters = new RidgeRegressionF32Parameters();
        setRidgeRegressionParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, y, parameters) {
        const xAsF32 = x.asRsMatrix('f32');
        const yAsF32 = yAsFloat32Array(y);
        return RidgeRegressionF32F32.fit(xAsF32, yAsF32, parameters);
    }
    toMatrix(x) {
        return x.asRsMatrix('f32');
    }
    deserialize(data) {
        return RidgeRegressionF32F32.deserialize(data);
    }
}
export default RidgeRegressionF32F32Provider;
