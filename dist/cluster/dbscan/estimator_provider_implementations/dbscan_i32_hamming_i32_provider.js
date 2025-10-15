import {} from '../../../index.js';
import { converters } from '../../../linalg/dense-matrix/index.js';
import { DBSCANI32EuclidianI32Parameters, DBSCANI32I32HammingI32, DBSCANI32HammingI32Parameters, HammingI32, } from '../../../core-bindings/index.js';
import { setDBSCANParametersValues } from '../parameters.js';
import {} from '../../../estimator.js';
class DBSCANI32HammingI32Provider {
    parameters(config) {
        const parameters = new DBSCANI32EuclidianI32Parameters().withDistanceHammingI32(new HammingI32());
        setDBSCANParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsI32 = converters.toDenseMatrixI32(x);
        return DBSCANI32I32HammingI32.fit(xAsI32, parameters);
    }
    toMatrix(x) {
        return converters.toDenseMatrixI32(x);
    }
    deserialize(data) {
        return DBSCANI32I32HammingI32.deserialize(data);
    }
}
export default DBSCANI32HammingI32Provider;
