import {} from '../../../index.js';
import { converters } from '../../../linalg/dense-matrix/index.js';
import { DBSCANF32I32EuclidianF32, DBSCANF32EuclidianF32Parameters } from '../../../core-bindings/index.js';
import { setDBSCANParametersValues } from '../parameters.js';
import {} from '../../../estimator.js';
class DBSCANF32EuclidianF32Provider {
    parameters(config) {
        const parameters = new DBSCANF32EuclidianF32Parameters();
        setDBSCANParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsF32 = converters.toDenseMatrixF32(x);
        return DBSCANF32I32EuclidianF32.fit(xAsF32, parameters);
    }
    toMatrix(x) {
        return converters.toDenseMatrixF32(x);
    }
    deserialize(data) {
        return DBSCANF32I32EuclidianF32.deserialize(data);
    }
}
export default DBSCANF32EuclidianF32Provider;
