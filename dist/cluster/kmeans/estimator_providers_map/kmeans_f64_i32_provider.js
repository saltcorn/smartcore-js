import {} from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { DenseMatrixF64, KMeansF64I32, KMeansParameters } from '../../../core-bindings/index.js';
import { setKMeansParametersValues } from '../parameters.js';
import {} from '../../../estimator.js';
class KMeansF64F64Provider {
    parameters(config) {
        const parameters = new KMeansParameters();
        setKMeansParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsF64 = x.asRsMatrix('f64');
        return KMeansF64I32.fit(xAsF64, parameters);
    }
    toMatrix(x) {
        return x.asRsMatrix('f64');
    }
    deserialize(data) {
        return KMeansF64I32.deserialize(data);
    }
}
export default KMeansF64F64Provider;
