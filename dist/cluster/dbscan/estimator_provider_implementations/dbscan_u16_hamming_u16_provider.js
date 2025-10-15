import {} from '../../../index.js';
import { converters } from '../../../linalg/dense-matrix/index.js';
import { DBSCANU16EuclidianU16Parameters, DBSCANU16I32HammingU16, DBSCANU16HammingU16Parameters, HammingU16, } from '../../../core-bindings/index.js';
import { setDBSCANParametersValues } from '../parameters.js';
import {} from '../../../estimator.js';
class DBSCANU16HammingU16Provider {
    parameters(config) {
        const parameters = new DBSCANU16EuclidianU16Parameters().withDistanceHammingU16(new HammingU16());
        setDBSCANParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsU16 = converters.toDenseMatrixU16(x);
        return DBSCANU16I32HammingU16.fit(xAsU16, parameters);
    }
    toMatrix(x) {
        return converters.toDenseMatrixU16(x);
    }
    deserialize(data) {
        return DBSCANU16I32HammingU16.deserialize(data);
    }
}
export default DBSCANU16HammingU16Provider;
