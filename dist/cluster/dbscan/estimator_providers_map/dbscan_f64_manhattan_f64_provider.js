import {} from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { DBSCANF64I32ManhattanF64, DBSCANF64EuclidianF64Parameters, DBSCANF64ManhattanF64Parameters, ManhattanF64, DenseMatrixF64, } from '../../../core-bindings/index.js';
import { setDBSCANParametersValues } from '../parameters.js';
import {} from '../../../estimator.js';
class DBSCANF64ManhattanF64Provider {
    parameters(config) {
        const parameters = new DBSCANF64EuclidianF64Parameters().withDistanceManhattanF64(new ManhattanF64());
        setDBSCANParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        // TODO: Handle case where x is DataFrame
        const xAsF64 = x.asRsMatrix('f64');
        return DBSCANF64I32ManhattanF64.fit(xAsF64, parameters);
    }
    toMatrix(x) {
        // TODO: Handle case where x is DataFrame
        return x.asRsMatrix('f64');
    }
    deserialize(data) {
        return DBSCANF64I32ManhattanF64.deserialize(data);
    }
}
export default DBSCANF64ManhattanF64Provider;
