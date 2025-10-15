import {} from '../../../index.js';
import { converters } from '../../../linalg/dense-matrix/index.js';
import { DBSCANU64I32ManhattanU64, DBSCANU64EuclidianU64Parameters, DBSCANU64ManhattanU64Parameters, ManhattanU64, } from '../../../core-bindings/index.js';
import { setDBSCANParametersValues } from '../parameters.js';
import {} from '../../../estimator.js';
class DBSCANU64ManhattanU64Provider {
    parameters(config) {
        const parameters = new DBSCANU64EuclidianU64Parameters().withDistanceManhattanU64(new ManhattanU64());
        setDBSCANParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsU64 = converters.toDenseMatrixU64(x);
        return DBSCANU64I32ManhattanU64.fit(xAsU64, parameters);
    }
    toMatrix(x) {
        return converters.toDenseMatrixU64(x);
    }
    deserialize(data) {
        return DBSCANU64I32ManhattanU64.deserialize(data);
    }
}
export default DBSCANU64ManhattanU64Provider;
