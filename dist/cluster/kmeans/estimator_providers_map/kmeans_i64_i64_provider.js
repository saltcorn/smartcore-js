import {} from '../../../index.js';
import { converters } from '../../../linalg/dense-matrix/index.js';
import { KMeansI64I64, KMeansParameters } from '../../../core-bindings/index.js';
import { setKMeansParametersValues } from '../parameters.js';
import {} from '../../../estimator.js';
class KMeansI64I64Provider {
    parameters(config) {
        const parameters = new KMeansParameters();
        setKMeansParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsI64 = converters.toDenseMatrixI64(x);
        return KMeansI64I64.fit(xAsI64, parameters);
    }
    toMatrix(x) {
        return converters.toDenseMatrixI64(x);
    }
    deserialize(data) {
        return KMeansI64I64.deserialize(data);
    }
}
export default KMeansI64I64Provider;
