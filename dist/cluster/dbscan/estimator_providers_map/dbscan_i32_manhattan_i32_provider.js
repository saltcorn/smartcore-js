import {} from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { DBSCANI32I32ManhattanI32, DBSCANI32EuclidianI32Parameters, DBSCANI32ManhattanI32Parameters, ManhattanI32, DenseMatrixI32, } from '../../../core-bindings/index.js';
import { setDBSCANParametersValues } from '../parameters.js';
import {} from '../../../estimator.js';
class DBSCANI32ManhattanI32Provider {
    parameters(config) {
        const parameters = new DBSCANI32EuclidianI32Parameters().withDistanceManhattanI32(new ManhattanI32());
        setDBSCANParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsI32 = x.asRsMatrix('i32');
        return DBSCANI32I32ManhattanI32.fit(xAsI32, parameters);
    }
    toMatrix(x) {
        return x.asRsMatrix('i32');
    }
    deserialize(data) {
        return DBSCANI32I32ManhattanI32.deserialize(data);
    }
}
export default DBSCANI32ManhattanI32Provider;
