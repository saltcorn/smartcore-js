import {} from '../../../index.js';
import { converters } from '../../../linalg/dense-matrix/index.js';
import { DBSCANF32I32MinkowskiF32, DBSCANF32EuclidianF32Parameters, DBSCANF32MinkowskiF32Parameters, MinkowskiF32, } from '../../../core-bindings/index.js';
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
        const xAsF32 = converters.toDenseMatrixF32(x);
        return DBSCANF32I32MinkowskiF32.fit(xAsF32, parameters);
    }
    toMatrix(x) {
        return converters.toDenseMatrixF32(x);
    }
    deserialize(data) {
        return DBSCANF32I32MinkowskiF32.deserialize(data);
    }
}
export default DBSCANF32MinkowskiF32Provider;
