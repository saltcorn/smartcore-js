import {} from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { DBSCANF32I32MinkowskiF32, DBSCANF32EuclidianF32Parameters, DBSCANF32MinkowskiF32Parameters, MinkowskiF32, DenseMatrixF32, } from '../../../core-bindings/index.js';
import { setDBSCANParametersValues } from '../parameters.js';
import {} from '../../../estimator.js';
class DBSCANF32MinkowskiF32Provider {
    parameters(config) {
        if (!config.p) {
            throw new Error(`Minkowski expects 'config.p' to be provided.`);
        }
        const parameters = new DBSCANF32EuclidianF32Parameters().withDistanceMinkowskiF32(new MinkowskiF32(config.p));
        setDBSCANParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsF32 = x.asRsMatrix('f32');
        return DBSCANF32I32MinkowskiF32.fit(xAsF32, parameters);
    }
    toMatrix(x) {
        return x.asRsMatrix('f32');
    }
    deserialize(data) {
        return DBSCANF32I32MinkowskiF32.deserialize(data);
    }
}
export default DBSCANF32MinkowskiF32Provider;
