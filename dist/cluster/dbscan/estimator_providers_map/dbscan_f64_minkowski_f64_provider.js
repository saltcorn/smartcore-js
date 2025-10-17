import {} from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { DBSCANF64I32MinkowskiF64, DBSCANF64EuclidianF64Parameters, DBSCANF64MinkowskiF64Parameters, MinkowskiF64, DenseMatrixF64, } from '../../../core-bindings/index.js';
import { setDBSCANParametersValues } from '../parameters.js';
import {} from '../../../estimator.js';
class DBSCANF64MinkowskiF64Provider {
    parameters(config) {
        if (!config.p) {
            throw new Error(`Minkowski expects 'config.p' to be provided.`);
        }
        const parameters = new DBSCANF64EuclidianF64Parameters().withDistanceMinkowskiF64(new MinkowskiF64(config.p));
        setDBSCANParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsF64 = x.asRsMatrix('f64');
        return DBSCANF64I32MinkowskiF64.fit(xAsF64, parameters);
    }
    toMatrix(x) {
        return x.asRsMatrix('f64');
    }
    deserialize(data) {
        return DBSCANF64I32MinkowskiF64.deserialize(data);
    }
}
export default DBSCANF64MinkowskiF64Provider;
