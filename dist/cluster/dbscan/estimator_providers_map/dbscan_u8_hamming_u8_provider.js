import {} from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { DBSCANU8EuclidianU8Parameters, DBSCANU8I32HammingU8, DBSCANU8HammingU8Parameters, HammingU8, DenseMatrixU8, } from '../../../core-bindings/index.js';
import { setDBSCANParametersValues } from '../parameters.js';
import {} from '../../../estimator.js';
class DBSCANU8HammingU8Provider {
    parameters(config) {
        const parameters = new DBSCANU8EuclidianU8Parameters().withDistanceHammingU8(new HammingU8());
        setDBSCANParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        // TODO: Handle case where x is DataFrame
        const xAsU8 = x.asRsMatrix('u8');
        return DBSCANU8I32HammingU8.fit(xAsU8, parameters);
    }
    toMatrix(x) {
        // TODO: Handle case where x is DataFrame
        return x.asRsMatrix('u8');
    }
    deserialize(data) {
        return DBSCANU8I32HammingU8.deserialize(data);
    }
}
export default DBSCANU8HammingU8Provider;
