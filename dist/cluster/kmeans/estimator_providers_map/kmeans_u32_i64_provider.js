import {} from '../../../index.js';
import { converters } from '../../../linalg/dense-matrix/index.js';
import { KMeansU32I64, KMeansParameters } from '../../../core-bindings/index.js';
import { setKMeansParametersValues } from '../parameters.js';
import {} from '../../../estimator.js';
class KMeansU32U32Provider {
    parameters(config) {
        const parameters = new KMeansParameters();
        setKMeansParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsU32 = converters.toDenseMatrixU32(x);
        return KMeansU32I64.fit(xAsU32, parameters);
    }
    toMatrix(x) {
        return converters.toDenseMatrixU32(x);
    }
    deserialize(data) {
        return KMeansU32I64.deserialize(data);
    }
}
export default KMeansU32U32Provider;
