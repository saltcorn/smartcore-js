import {} from '../../../index.js';
import { converters } from '../../../linalg/dense-matrix/index.js';
import { KMeansI32I64, KMeansParameters } from '../../../core-bindings/index.js';
import { setKMeansParametersValues } from '../parameters.js';
import {} from '../../../estimator.js';
class KMeansI32I32Provider {
    parameters(config) {
        const parameters = new KMeansParameters();
        setKMeansParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsI32 = converters.toDenseMatrixI32(x);
        return KMeansI32I64.fit(xAsI32, parameters);
    }
    toMatrix(x) {
        return converters.toDenseMatrixI32(x);
    }
    deserialize(data) {
        return KMeansI32I64.deserialize(data);
    }
}
export default KMeansI32I32Provider;
