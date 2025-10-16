import {} from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { DBSCANI32EuclidianI32Parameters, DBSCANI32I32HammingI32, DBSCANI32HammingI32Parameters, HammingI32, DenseMatrixI32, } from '../../../core-bindings/index.js';
import { setDBSCANParametersValues } from '../parameters.js';
import {} from '../../../estimator.js';
class DBSCANI32HammingI32Provider {
    parameters(config) {
        const parameters = new DBSCANI32EuclidianI32Parameters().withDistanceHammingI32(new HammingI32());
        setDBSCANParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        // TODO: Handle case where x is DataFrame
        const xAsI32 = x.asRsMatrix('i32');
        return DBSCANI32I32HammingI32.fit(xAsI32, parameters);
    }
    toMatrix(x) {
        // TODO: Handle case where x is DataFrame
        return x.asRsMatrix('i32');
    }
    deserialize(data) {
        return DBSCANI32I32HammingI32.deserialize(data);
    }
}
export default DBSCANI32HammingI32Provider;
