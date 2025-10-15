import {} from '../../../index.js';
import { converters } from '../../../linalg/dense-matrix/index.js';
import { DBSCANU64I32EuclidianU64, DBSCANU64EuclidianU64Parameters } from '../../../core-bindings/index.js';
import { setDBSCANParametersValues } from '../parameters.js';
import {} from '../../../estimator.js';
class DBSCANU64EuclidianU64Provider {
    parameters(config) {
        const parameters = new DBSCANU64EuclidianU64Parameters();
        setDBSCANParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsU64 = converters.toDenseMatrixU64(x);
        return DBSCANU64I32EuclidianU64.fit(xAsU64, parameters);
    }
    toMatrix(x) {
        return converters.toDenseMatrixU64(x);
    }
    deserialize(data) {
        return DBSCANU64I32EuclidianU64.deserialize(data);
    }
}
export default DBSCANU64EuclidianU64Provider;
