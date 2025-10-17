import {} from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { DBSCANI64I32MinkowskiI64, DBSCANI64EuclidianI64Parameters, DBSCANI64MinkowskiI64Parameters, MinkowskiI64, DenseMatrixI64, } from '../../../core-bindings/index.js';
import { setDBSCANParametersValues } from '../parameters.js';
import {} from '../../../estimator.js';
class DBSCANI64MinkowskiI64Provider {
    parameters(config) {
        if (!config.p) {
            throw new Error(`Minkowski expects 'config.p' to be provided.`);
        }
        const parameters = new DBSCANI64EuclidianI64Parameters().withDistanceMinkowskiI64(new MinkowskiI64(config.p));
        setDBSCANParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsI64 = x.asRsMatrix('i64');
        return DBSCANI64I32MinkowskiI64.fit(xAsI64, parameters);
    }
    toMatrix(x) {
        return x.asRsMatrix('i64');
    }
    deserialize(data) {
        return DBSCANI64I32MinkowskiI64.deserialize(data);
    }
}
export default DBSCANI64MinkowskiI64Provider;
