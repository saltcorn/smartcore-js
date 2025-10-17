import {} from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { DBSCANI64I32ManhattanI64, DBSCANI64EuclidianI64Parameters, DBSCANI64ManhattanI64Parameters, ManhattanI64, DenseMatrixI64, } from '../../../core-bindings/index.js';
import { setDBSCANParametersValues } from '../parameters.js';
import {} from '../../../estimator.js';
class DBSCANI64ManhattanI64Provider {
    parameters(config) {
        const parameters = new DBSCANI64EuclidianI64Parameters().withDistanceManhattanI64(new ManhattanI64());
        setDBSCANParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsI64 = x.asRsMatrix('i64');
        return DBSCANI64I32ManhattanI64.fit(xAsI64, parameters);
    }
    toMatrix(x) {
        return x.asRsMatrix('i64');
    }
    deserialize(data) {
        return DBSCANI64I32ManhattanI64.deserialize(data);
    }
}
export default DBSCANI64ManhattanI64Provider;
