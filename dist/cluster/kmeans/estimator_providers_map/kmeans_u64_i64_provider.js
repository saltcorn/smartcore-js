import {} from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { KMeansU64I64, KMeansParameters, DenseMatrixU64 } from '../../../core-bindings/index.js';
import { setKMeansParametersValues } from '../parameters.js';
import {} from '../../../estimator.js';
class KMeansU64U64Provider {
    parameters(config) {
        const parameters = new KMeansParameters();
        setKMeansParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsU64 = x.asRsMatrix('u64');
        return KMeansU64I64.fit(xAsU64, parameters);
    }
    toMatrix(x) {
        return x.asRsMatrix('u64');
    }
    deserialize(data) {
        return KMeansU64I64.deserialize(data);
    }
}
export default KMeansU64U64Provider;
