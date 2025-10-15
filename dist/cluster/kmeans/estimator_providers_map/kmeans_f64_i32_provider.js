import {} from '../../../index.js';
import { converters } from '../../../linalg/dense-matrix/index.js';
import { KMeansF64I32, KMeansParameters } from '../../../core-bindings/index.js';
import { setKMeansParametersValues } from '../parameters.js';
import {} from '../../../estimator.js';
class KMeansF64F64Provider {
    parameters(config) {
        const parameters = new KMeansParameters();
        setKMeansParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsF64 = converters.toDenseMatrixF64(x);
        return KMeansF64I32.fit(xAsF64, parameters);
    }
    toMatrix(x) {
        return converters.toDenseMatrixF64(x);
    }
    deserialize(data) {
        return KMeansF64I32.deserialize(data);
    }
}
export default KMeansF64F64Provider;
