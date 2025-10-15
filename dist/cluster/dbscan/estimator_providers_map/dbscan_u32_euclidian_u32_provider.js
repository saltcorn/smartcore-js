import {} from '../../../index.js';
import { converters } from '../../../linalg/dense-matrix/index.js';
import { DBSCANU32I32EuclidianU32, DBSCANU32EuclidianU32Parameters } from '../../../core-bindings/index.js';
import { setDBSCANParametersValues } from '../parameters.js';
import {} from '../../../estimator.js';
class DBSCANU32EuclidianU32Provider {
    parameters(config) {
        const parameters = new DBSCANU32EuclidianU32Parameters();
        setDBSCANParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsU32 = converters.toDenseMatrixU32(x);
        return DBSCANU32I32EuclidianU32.fit(xAsU32, parameters);
    }
    toMatrix(x) {
        return converters.toDenseMatrixU32(x);
    }
    deserialize(data) {
        return DBSCANU32I32EuclidianU32.deserialize(data);
    }
}
export default DBSCANU32EuclidianU32Provider;
