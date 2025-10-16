import {} from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { DBSCANU32I32EuclidianU32, DBSCANU32EuclidianU32Parameters, DenseMatrixU32, } from '../../../core-bindings/index.js';
import { setDBSCANParametersValues } from '../parameters.js';
import {} from '../../../estimator.js';
class DBSCANU32EuclidianU32Provider {
    parameters(config) {
        const parameters = new DBSCANU32EuclidianU32Parameters();
        setDBSCANParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        // TODO: Handle case where x is DataFrame
        const xAsU32 = x.asRsMatrix('u32');
        return DBSCANU32I32EuclidianU32.fit(xAsU32, parameters);
    }
    toMatrix(x) {
        // TODO: Handle case where x is DataFrame
        return x.asRsMatrix('u32');
    }
    deserialize(data) {
        return DBSCANU32I32EuclidianU32.deserialize(data);
    }
}
export default DBSCANU32EuclidianU32Provider;
