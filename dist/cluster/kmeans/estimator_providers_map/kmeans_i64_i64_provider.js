import {} from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { DenseMatrixI64, KMeansI64I64, KMeansParameters } from '../../../core-bindings/index.js';
import { setKMeansParametersValues } from '../parameters.js';
import {} from '../../../estimator.js';
class KMeansI64I64Provider {
    parameters(config) {
        const parameters = new KMeansParameters();
        setKMeansParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsI64 = x.asRsMatrix('i64');
        return KMeansI64I64.fit(xAsI64, parameters);
    }
    toMatrix(x) {
        return x.asRsMatrix('i64');
    }
    deserialize(data) {
        return KMeansI64I64.deserialize(data);
    }
}
export default KMeansI64I64Provider;
