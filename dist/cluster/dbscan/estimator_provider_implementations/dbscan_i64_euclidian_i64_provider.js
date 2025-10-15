import {} from '../../../index.js';
import { converters } from '../../../linalg/dense-matrix/index.js';
import { DBSCANI64I32EuclidianI64, DBSCANI64EuclidianI64Parameters } from '../../../core-bindings/index.js';
import { setDBSCANParametersValues } from '../parameters.js';
import {} from '../../../estimator.js';
class DBSCANI64EuclidianI64Provider {
    parameters(config) {
        const parameters = new DBSCANI64EuclidianI64Parameters();
        setDBSCANParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsI64 = converters.toDenseMatrixI64(x);
        return DBSCANI64I32EuclidianI64.fit(xAsI64, parameters);
    }
    toMatrix(x) {
        return converters.toDenseMatrixI64(x);
    }
    deserialize(data) {
        return DBSCANI64I32EuclidianI64.deserialize(data);
    }
}
export default DBSCANI64EuclidianI64Provider;
