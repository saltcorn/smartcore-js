import {} from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { DenseMatrixF32, OneHotEncoderF32, OneHotEncoderParameters } from '../../../core-bindings/index.js';
import {} from '../index.js';
import {} from '../../../estimator.js';
import { normalizeCategoricalParams } from './index.js';
class OneHotEncoderF32Provider {
    parameters(config) {
        let categoricalParams = normalizeCategoricalParams(config.categoricalParams);
        const parameters = new OneHotEncoderParameters(categoricalParams);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsF32 = x.asRsMatrix('f32');
        return OneHotEncoderF32.fit(xAsF32, parameters);
    }
    toMatrix(x) {
        return x.asRsMatrix('f32');
    }
    deserialize(data) {
        return OneHotEncoderF32.deserialize(data);
    }
}
export default OneHotEncoderF32Provider;
