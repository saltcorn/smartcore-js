import {} from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { DBSCANI64I32EuclidianI64, DBSCANI64EuclidianI64Parameters, DenseMatrixI64, } from '../../../core-bindings/index.js';
import { setDBSCANParametersValues } from '../parameters.js';
import {} from '../../../estimator.js';
class DBSCANI64EuclidianI64Provider {
    parameters(config) {
        const parameters = new DBSCANI64EuclidianI64Parameters();
        setDBSCANParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsI64 = x.asRsMatrix('i64');
        return DBSCANI64I32EuclidianI64.fit(xAsI64, parameters);
    }
    toMatrix(x) {
        return x.asRsMatrix('i64');
    }
    deserialize(data) {
        return DBSCANI64I32EuclidianI64.deserialize(data);
    }
}
export default DBSCANI64EuclidianI64Provider;
