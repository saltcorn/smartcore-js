import {} from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { DBSCANU8I32EuclidianU8, DBSCANU8EuclidianU8Parameters, DenseMatrixU8 } from '../../../core-bindings/index.js';
import { setDBSCANParametersValues } from '../parameters.js';
import {} from '../../../estimator.js';
class DBSCANU8EuclidianU8Provider {
    parameters(config) {
        const parameters = new DBSCANU8EuclidianU8Parameters();
        setDBSCANParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsU8 = x.asRsMatrix('u8');
        return DBSCANU8I32EuclidianU8.fit(xAsU8, parameters);
    }
    toMatrix(x) {
        return x.asRsMatrix('u8');
    }
    deserialize(data) {
        return DBSCANU8I32EuclidianU8.deserialize(data);
    }
}
export default DBSCANU8EuclidianU8Provider;
