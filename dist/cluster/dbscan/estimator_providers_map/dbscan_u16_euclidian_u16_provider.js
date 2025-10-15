import {} from '../../../index.js';
import { converters } from '../../../linalg/dense-matrix/index.js';
import { DBSCANU16I32EuclidianU16, DBSCANU16EuclidianU16Parameters } from '../../../core-bindings/index.js';
import { setDBSCANParametersValues } from '../parameters.js';
import {} from '../../../estimator.js';
class DBSCANU16EuclidianU16Provider {
    parameters(config) {
        const parameters = new DBSCANU16EuclidianU16Parameters();
        setDBSCANParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsU16 = converters.toDenseMatrixU16(x);
        return DBSCANU16I32EuclidianU16.fit(xAsU16, parameters);
    }
    toMatrix(x) {
        return converters.toDenseMatrixU16(x);
    }
    deserialize(data) {
        return DBSCANU16I32EuclidianU16.deserialize(data);
    }
}
export default DBSCANU16EuclidianU16Provider;
