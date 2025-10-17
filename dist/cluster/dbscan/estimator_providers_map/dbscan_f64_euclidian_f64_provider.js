import {} from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { DBSCANF64I32EuclidianF64, DBSCANF64EuclidianF64Parameters, DenseMatrixF64, } from '../../../core-bindings/index.js';
import { setDBSCANParametersValues } from '../parameters.js';
import {} from '../../../estimator.js';
class DBSCANF64EuclidianF64Provider {
    parameters(config) {
        const parameters = new DBSCANF64EuclidianF64Parameters();
        setDBSCANParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsF64 = x.asRsMatrix('f64');
        return DBSCANF64I32EuclidianF64.fit(xAsF64, parameters);
    }
    toMatrix(x) {
        return x.asRsMatrix('f64');
    }
    deserialize(data) {
        return DBSCANF64I32EuclidianF64.deserialize(data);
    }
}
export default DBSCANF64EuclidianF64Provider;
