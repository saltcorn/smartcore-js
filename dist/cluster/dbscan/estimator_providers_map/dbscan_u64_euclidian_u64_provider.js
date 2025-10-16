import {} from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { DBSCANU64I32EuclidianU64, DBSCANU64EuclidianU64Parameters, DenseMatrixU64, } from '../../../core-bindings/index.js';
import { setDBSCANParametersValues } from '../parameters.js';
import {} from '../../../estimator.js';
class DBSCANU64EuclidianU64Provider {
    parameters(config) {
        const parameters = new DBSCANU64EuclidianU64Parameters();
        setDBSCANParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        // TODO: Handle case where x is DataFrame
        const xAsU64 = x.asRsMatrix('u64');
        return DBSCANU64I32EuclidianU64.fit(xAsU64, parameters);
    }
    toMatrix(x) {
        // TODO: Handle case where x is DataFrame
        return x.asRsMatrix('u64');
    }
    deserialize(data) {
        return DBSCANU64I32EuclidianU64.deserialize(data);
    }
}
export default DBSCANU64EuclidianU64Provider;
