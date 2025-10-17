import {} from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { DenseMatrixF64, OneHotEncoderF64, OneHotEncoderParameters } from '../../../core-bindings/index.js';
import {} from '../index.js';
import {} from '../../../estimator.js';
import { normalizeCategoricalParams } from './index.js';
class OneHotEncoderF64Provider {
    parameters(config) {
        let categoricalParams = normalizeCategoricalParams(config.categoricalParams);
        const parameters = new OneHotEncoderParameters(categoricalParams);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsF64 = x.asRsMatrix('f64');
        return OneHotEncoderF64.fit(xAsF64, parameters);
    }
    toMatrix(x) {
        return x.asRsMatrix('f64');
    }
    deserialize(data) {
        return OneHotEncoderF64.deserialize(data);
    }
}
export default OneHotEncoderF64Provider;
