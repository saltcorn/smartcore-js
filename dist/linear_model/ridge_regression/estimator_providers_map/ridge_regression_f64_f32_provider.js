import {} from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { RidgeRegressionF64F32, RidgeRegressionF32Parameters, DenseMatrixF64 } from '../../../core-bindings/index.js';
import {} from '../index.js';
import {} from '../../../estimator.js';
import { setRidgeRegressionParametersValues } from './index.js';
import { yAsFloat32Array } from '../../../utilities/index.js';
class RidgeRegressionF64F32Provider {
    parameters(config) {
        const parameters = new RidgeRegressionF32Parameters();
        setRidgeRegressionParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, y, parameters) {
        const xAsF64 = x.asRsMatrix('f64');
        const yAsF32 = yAsFloat32Array(y);
        return RidgeRegressionF64F32.fit(xAsF64, yAsF32, parameters);
    }
    toMatrix(x) {
        return x.asRsMatrix('f32');
    }
    deserialize(data) {
        return RidgeRegressionF64F32.deserialize(data);
    }
}
export default RidgeRegressionF64F32Provider;
