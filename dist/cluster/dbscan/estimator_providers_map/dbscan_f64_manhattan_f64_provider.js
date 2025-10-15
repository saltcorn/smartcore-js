import {} from '../../../index.js';
import { converters } from '../../../linalg/dense-matrix/index.js';
import { DBSCANF64I32ManhattanF64, DBSCANF64EuclidianF64Parameters, DBSCANF64ManhattanF64Parameters, ManhattanF64, } from '../../../core-bindings/index.js';
import { setDBSCANParametersValues } from '../parameters.js';
import {} from '../../../estimator.js';
class DBSCANF64ManhattanF64Provider {
    parameters(config) {
        const parameters = new DBSCANF64EuclidianF64Parameters().withDistanceManhattanF64(new ManhattanF64());
        setDBSCANParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsF64 = converters.toDenseMatrixF64(x);
        return DBSCANF64I32ManhattanF64.fit(xAsF64, parameters);
    }
    toMatrix(x) {
        return converters.toDenseMatrixF64(x);
    }
    deserialize(data) {
        return DBSCANF64I32ManhattanF64.deserialize(data);
    }
}
export default DBSCANF64ManhattanF64Provider;
