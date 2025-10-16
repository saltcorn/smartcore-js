import {} from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { DBSCANF32I32EuclidianF32, DBSCANF32EuclidianF32Parameters, DenseMatrixF32, } from '../../../core-bindings/index.js';
import { setDBSCANParametersValues } from '../parameters.js';
import {} from '../../../estimator.js';
class DBSCANF32EuclidianF32Provider {
    parameters(config) {
        const parameters = new DBSCANF32EuclidianF32Parameters();
        setDBSCANParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        // TODO: Handle case where x is DataFrame
        const xAsF32 = x.asRsMatrix('f32');
        return DBSCANF32I32EuclidianF32.fit(xAsF32, parameters);
    }
    toMatrix(x) {
        // TODO: Handle case where x is DataFrame
        return x.asRsMatrix('f32');
    }
    deserialize(data) {
        return DBSCANF32I32EuclidianF32.deserialize(data);
    }
}
export default DBSCANF32EuclidianF32Provider;
