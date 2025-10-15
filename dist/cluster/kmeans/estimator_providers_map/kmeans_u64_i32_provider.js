import {} from '../../../index.js';
import { converters } from '../../../linalg/dense-matrix/index.js';
import { KMeansU64I32, KMeansParameters } from '../../../core-bindings/index.js';
import { setKMeansParametersValues } from '../parameters.js';
import {} from '../../../estimator.js';
class KMeansU64U64Provider {
    parameters(config) {
        const parameters = new KMeansParameters();
        setKMeansParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsU64 = converters.toDenseMatrixU64(x);
        return KMeansU64I32.fit(xAsU64, parameters);
    }
    toMatrix(x) {
        return converters.toDenseMatrixU64(x);
    }
    deserialize(data) {
        return KMeansU64I32.deserialize(data);
    }
}
export default KMeansU64U64Provider;
