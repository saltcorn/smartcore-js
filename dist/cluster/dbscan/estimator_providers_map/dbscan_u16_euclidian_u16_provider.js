import {} from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { DBSCANU16I32EuclidianU16, DBSCANU16EuclidianU16Parameters, DenseMatrixU16, } from '../../../core-bindings/index.js';
import { setDBSCANParametersValues } from '../parameters.js';
import {} from '../../../estimator.js';
class DBSCANU16EuclidianU16Provider {
    parameters(config) {
        const parameters = new DBSCANU16EuclidianU16Parameters();
        setDBSCANParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        // TODO: Handle case where x is DataFrame
        const xAsU16 = x.asRsMatrix('u16');
        return DBSCANU16I32EuclidianU16.fit(xAsU16, parameters);
    }
    toMatrix(x) {
        // TODO: Handle case where x is DataFrame
        return x.asRsMatrix('u16');
    }
    deserialize(data) {
        return DBSCANU16I32EuclidianU16.deserialize(data);
    }
}
export default DBSCANU16EuclidianU16Provider;
