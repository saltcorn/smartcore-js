import {} from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { DBSCANU16EuclidianU16Parameters, DBSCANU16I32HammingU16, DBSCANU16HammingU16Parameters, HammingU16, DenseMatrixU16, } from '../../../core-bindings/index.js';
import { setDBSCANParametersValues } from '../parameters.js';
import {} from '../../../estimator.js';
class DBSCANU16HammingU16Provider {
    parameters(config) {
        const parameters = new DBSCANU16EuclidianU16Parameters().withDistanceHammingU16(new HammingU16());
        setDBSCANParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        // TODO: Handle case where x is DataFrame
        const xAsU16 = x.asRsMatrix('u16');
        return DBSCANU16I32HammingU16.fit(xAsU16, parameters);
    }
    toMatrix(x) {
        // TODO: Handle case where x is DataFrame
        return x.asRsMatrix('u16');
    }
    deserialize(data) {
        return DBSCANU16I32HammingU16.deserialize(data);
    }
}
export default DBSCANU16HammingU16Provider;
